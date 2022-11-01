import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {epochToDate, parseDate, DateFormat, DateTimeFormat} from '../../utils';
import {TestDevices} from './Manufacturers';

const valueSets = {
  v: {
    tg: {
      840539006: 'COVID-19',
    },
    vp: {
      1119305005: 'SARS-CoV-2 antigen vaccine',
      1119349007: 'SARS-CoV-2 mRNA vaccine',
      J07BX03: 'covid-19 vaccines',
    },
    mp: {
      'EU/1/20/1528': 'Comirnaty',
      'EU/1/20/1507': 'Spikevax (previously COVID-19 Vaccine Moderna)',
      'EU/1/21/1529': 'Vaxzevria',
      'EU/1/20/1525': 'COVID-19 Vaccine Janssen',
      CVnCoV: 'CVnCoV',
      'NVX-CoV2373': 'NVX-CoV2373',
      'Sputnik-V': 'Sputnik-V',
      Convidecia: 'Convidecia',
      EpiVacCorona: 'EpiVacCorona',
      'BBIBP-CorV': 'BBIBP-CorV',
      'Inactivated-SARS-CoV-2-Vero-Cell': 'Inactivated SARS-CoV-2 (Vero Cell)',
      CoronaVac: 'CoronaVac',
      Covaxin: 'Covaxin (also known as BBV152 A, B, C)',
      Covishield: 'Covishield (ChAdOx1_nCoV-19)',
    },
    ma: {
      'ORG-100001699': 'AstraZeneca AB',
      'ORG-100030215': 'Biontech Manufacturing GmbH',
      'ORG-100001417': 'Janssen-Cilag International',
      'ORG-100031184': 'Moderna Biotech Spain S.L.',
      'ORG-100006270': 'Curevac AG',
      'ORG-100013793': 'CanSino Biologics',
      'ORG-100020693': 'China Sinopharm International Corp. - Beijing location',
      'ORG-100010771':
        'Sinopharm Weiqida Europe Pharmaceutical s.r.o. - Prague location',
      'ORG-100024420':
        'Sinopharm Zhijun (Shenzhen) Pharmaceutical Co. Ltd. - Shenzhen location',
      'ORG-100032020': 'Novavax CZ AS',
      'Gamaleya-Research-Institute': 'Gamaleya-Research-Institute',
      'Vector-Institute': 'Vector Institute',
      'Sinovac-Biotech': 'Sinovac Biotech',
      'Bharat-Biotech': 'Bharat Biotech',
      'ORG-100001981': 'Serum Institute Of India Private Limited',
    },
  },
  t: {
    tg: {
      840539006: 'COVID-19',
    },
    tt: {
      'LP6464-4': 'Nucleic acid amplification with probe detection',
      'LP217198-3': 'Rapid immunoassay',
    },
    tr: {
      260415000: 'Not Detected',
      260373001: 'Detected',
    },
  },
  r: {
    tg: {
      840539006: 'COVID-19',
    },
  },
};

const getTestDevice = id => {
  const devices = TestDevices.deviceList;
  for (let i = 0; i < devices.length; i++) {
    if (devices[i].id_device === id) {
      return devices[i];
    }
  }
  return null;
};

class CertText extends React.Component {
  getMappedValue(type, field, value) {
    if (type === undefined || field === undefined) {
      return undefined;
    }
    if (valueSets[type] === undefined) {
      return undefined;
    }
    if (valueSets[type][field] === undefined) {
      return undefined;
    }
    if (valueSets[type][field][value] === undefined) {
      return undefined;
    }
    return valueSets[type][field][value];
  }
  render() {
    let mappedValue;
    const {label, value, style, type, field} = this.props;
    mappedValue = this.getMappedValue(type, field, value);
    if (mappedValue === undefined) {
      mappedValue = value;
    }
    const labelTextStyle = {...style, fontWeight: 'bold'};
    const containerStyle = {
      flex: 1,
      flexDirection: 'row',
    };
    const labelStyle = {
      flex: 0.28,
    };
    const valueStyle = {
      flex: 0.72,
    };
    return (
      <View style={containerStyle}>
        <View style={labelStyle}>
          <Text style={labelTextStyle}>{label}</Text>
        </View>
        <View style={valueStyle}>
          <Text style={style}>{mappedValue}</Text>
        </View>
      </View>
    );
  }
}

class Names extends React.Component {
  render() {
    const nam = this.props.names;
    const styling = this.props.styling;
    return (
      <View>
        <CertText style={styling} label={'Family Name'} value={nam.fn} />
        <CertText style={styling} label={'Family Name'} value={nam.fnt} />
        <CertText style={styling} label={'Given Name'} value={nam.gn} />
        <CertText style={styling} label={'Given Name'} value={nam.gnt} />
      </View>
    );
  }
}

class VaccineRecord extends React.Component {
  render() {
    const v = this.props.vaccine;
    const styling = this.props.styling;
    const doses = `${v.dn}/${v.sd}`;
    return (
      <View>
        <CertText
          style={styling}
          label={'Target'}
          value={v.tg}
          type={'v'}
          field={'tg'}
        />
        <CertText
          style={styling}
          label={'Vaccine'}
          value={v.vp}
          type={'v'}
          field={'vp'}
        />
        <CertText
          style={styling}
          label={'Product'}
          value={v.mp}
          type={'v'}
          field={'mp'}
        />
        <CertText
          style={styling}
          label={'Manufacturer'}
          value={v.ma}
          type={'v'}
          field={'ma'}
        />
        <CertText style={styling} label={'Doses'} value={doses} />
        <CertText
          style={styling}
          label={'Date'}
          value={parseDate(v.dt, DateFormat)}
        />
        <CertText style={styling} label={'Country'} value={v.co} />
        <CertText style={styling} label={'Issuer'} value={v.is} />
        <CertText style={styling} label={'Certificate ID'} value={v.ci} />
      </View>
    );
  }
}

class TestRecord extends React.Component {
  render() {
    const t = this.props.test;
    const styling = this.props.styling;
    const testDevice = getTestDevice(t.ma);
    let name, manufacturer;
    if (testDevice === null) {
      name = t.nm;
      manufacturer = t.ma;
    } else {
      name = testDevice.commercial_name;
      manufacturer = testDevice.manufacturer.name;
    }
    return (
      <View>
        <CertText
          style={styling}
          label={'Target'}
          value={t.tg}
          type={'t'}
          field={'tg'}
        />
        <CertText
          style={styling}
          label={'Test Type'}
          value={t.tt}
          type={'t'}
          field={'tt'}
        />
        <CertText style={styling} label={'Name'} value={name} />
        <CertText style={styling} label={'Manufacturer'} value={manufacturer} />
        <CertText
          style={styling}
          label={'Sample Date'}
          value={parseDate(t.sc, DateTimeFormat)}
        />
        <CertText
          style={styling}
          label={'Test Result'}
          value={t.tr}
          type={'t'}
          field={'tr'}
        />
        <CertText style={styling} label={'Testing Center'} value={t.tc} />
        <CertText style={styling} label={'Issuer'} value={t.is} />
        <CertText style={styling} label={'Certificate ID'} value={t.ci} />
      </View>
    );
  }
}

class RecoveryRecord extends React.Component {
  render() {
    const r = this.props.recovery;
    const styling = this.props.styling;
    return (
      <View>
        <CertText
          style={styling}
          label={'Target'}
          value={r.tg}
          type={'r'}
          field={'tg'}
        />
        <CertText style={styling} label={'Country'} value={r.co} />
        <CertText style={styling} label={'Issuer'} value={r.is} />
        <CertText
          style={styling}
          label={'First Positive Test'}
          value={parseDate(r.fr, DateTimeFormat)}
        />
        <CertText
          style={styling}
          label={'Valid From'}
          value={parseDate(r.df, DateTimeFormat)}
        />
        <CertText
          style={styling}
          label={'Valid Until'}
          value={parseDate(r.du, DateTimeFormat)}
        />
        <CertText style={styling} label={'Certificate ID'} value={r.ci} />
      </View>
    );
  }
}

class RecordHeader extends React.Component {
  render() {
    const {label} = this.props;
    if (this.props.array.length) {
      return (
        <View style={styles.centeredContainer}>
          <Text style={styles.verified}>{label}</Text>
        </View>
      );
    }
    return null;
  }
}

class HCert extends React.Component {
  render() {
    const certificate = this.props.certificate;
    const styling = this.props.styling;
    if (certificate.eu_dgc_v1 === undefined) {
      return (
        <View style={styles.centeredContainer}>
          <Text style={styles.failed}>
            Health certificate could not be found
          </Text>
        </View>
      );
    }
    const cert = certificate.eu_dgc_v1;
    const vaccines = cert.v ? cert.v : [];
    const tests = cert.t ? cert.t : [];
    const recoveries = cert.r ? cert.r : [];
    return (
      <View>
        <CertText style={styling} label={'Version'} value={cert.ver} />
        <Names names={cert.nam} styling={styling} />
        <CertText
          style={styling}
          label={'Date of Birth'}
          value={parseDate(cert.dob, DateFormat)}
        />
        <RecordHeader label={'Vaccination Records'} array={vaccines} />
        {vaccines.map((vaccine, index) => (
          <VaccineRecord key={index} vaccine={vaccine} styling={styling} />
        ))}
        <RecordHeader label={'Test Records'} array={tests} />
        {tests.map((test, index) => (
          <TestRecord key={index} test={test} styling={styling} />
        ))}
        <RecordHeader label={'Recovery Records'} array={recoveries} />
        {recoveries.map((recovery, index) => (
          <RecoveryRecord key={index} recovery={recovery} styling={styling} />
        ))}
      </View>
    );
  }
}

export class DGC extends React.Component {
  render() {
    const cert = this.props.dgc;
    const verified = cert.status.verified;
    const message = cert.status.message;
    const dgc = cert.dgc;
    const styling = {
      margin: 5,
      padding: 5,
    };
    return (
      <ScrollView>
        <View style={styles.centeredContainer}>
          <Text style={verified ? styles.verified : styles.failed}>
            {message}
          </Text>
        </View>
        <CertText style={styling} label={'Issuer'} value={dgc.iss} />
        <CertText
          style={styling}
          label={'Issued'}
          value={epochToDate(dgc.iat)}
        />
        <CertText
          style={styling}
          label={'Expires'}
          value={epochToDate(dgc.exp)}
        />
        <HCert certificate={dgc.hcert} styling={styling} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  verified: {
    margin: 10,
    padding: 10,
    color: '#00FF00',
  },
  failed: {
    margin: 10,
    padding: 10,
    color: '#FF0000',
  },
});
