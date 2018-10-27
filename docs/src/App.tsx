import * as React from 'react';
import './App.css';
import {
  //Button,
  //Container,
  //Grid,
  Container,
  Header,
  Input,
  InputOnChangeData,
  Button,
  //Icon,
  //Image,
  //Item,
  //Label,
  //Menu,
  //Segment,
  //Step,
  //Table,
} from 'semantic-ui-react'

interface UUIDProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
}
interface UUIDState {
  value?: string;
}

function genUUID(): string {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

function isUUID(uuid: string): boolean {
  return /^[\da-f]{8,8}(-[\da-f]{4,4}){3,3}-[\da-f]{12,12}$/.test(uuid);
}

class UUIDInput extends React.Component<UUIDProps, UUIDState> {
  constructor(props: UUIDProps) {
    super(props);
    this.state = {
      value: this.props.value
    };
    this.onChange = this.onChange.bind(this);
    this.onGenerate = this.onGenerate.bind(this);
  }

  onChange(event: any, data: InputOnChangeData) {
    this.setState({ value: data.value }, () => this.props.onChange && this.props.onChange(data.value));
  }

  onGenerate() {
    this.setState({ value: genUUID() })
  }

  render() {
    const { value } = this.state;
    return <Input
      fluid
      error={!!value && !isUUID(value)}
      label={this.props.label}
      placeholder='aaaaaaaa-aaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
      value={value}
      onChange={this.onChange}
      action={<Button icon='magic' onClick={this.onGenerate} />}
    />
  }
}

interface AppProps {
}

interface BleCharacteristic {
  name?: string;
  uuid?: string;
  flags?: number;
  bytes?: number;
}

interface AppState {
  serviceUUID?: string;
  serviceDescription?: string;
  characteristics?: BleCharacteristic[];
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      serviceUUID: genUUID(),
      characteristics: []
    };
    this.addCharacteristic = this.addCharacteristic.bind(this);
  }

  private addCharacteristic() {    
    const characteristic: BleCharacteristic = {
      uuid: genUUID(),
      flags: 0,
      bytes: 0
    };
    this.setState({
      characteristics: (this.state.characteristics || []).concat(characteristic)
    })
  }

  public render() {
    const { serviceUUID, serviceDescription, characteristics } = this.state;
    return (
      <Container>
        <Header as='h1' content='Bluetooth service designer' />
        <Header as='h2' content="service" />
        <div className="ui segment">
          <UUIDInput value={serviceUUID} label="uuid" onChange={uuid => this.setState({ serviceUUID: uuid })} />
          <Input value={serviceDescription} label="description" onChange={(ev, data) => this.setState({ serviceDescription: data.value })} />
        </div>
        {(characteristics || []).map(characteristic =>
          <div className="ui segment">
          </div>
        )}
        <Button content="Add characteristic" onClick={this.addCharacteristic} />
      </Container>
    );
  }
}

export default App;
