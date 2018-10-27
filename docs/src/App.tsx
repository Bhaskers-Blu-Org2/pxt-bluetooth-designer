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

}
interface UUIDState {
  uuid?: string;
}

class UUIDInput extends React.Component<UUIDProps, UUIDState> {
  constructor(props: UUIDProps) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.onGenerate = this.onGenerate.bind(this);
  }

  onChange(event: any, data: InputOnChangeData) {
    this.setState({ uuid: data.value })
  }

  onGenerate() {
    this.setState({ uuid: this.genUUID() })
  }

  isUUID(uuid: string): boolean {
    return /^[\da-f]{8,8}(-[\da-f]{4,4}){3,3}-[\da-f]{12,12}$/.test(uuid);
  }

  genUUID(): string {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  render() {
    const { uuid } = this.state;
    return <div>
      <Input
        fluid
        error={!!uuid && !this.isUUID(uuid)}
        label="service uuid"
        placeholder='aaaaaaaa-aaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
        value={uuid}
        onChange={this.onChange}
      />
      <Button content="Generate" />
    </div>;
  }
}

interface AppProps {
}

interface AppState {
  serviceUUID?: string;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <Container>
        <Header as='h1' content='Bluetooth service designer' />
        <div className="ui segment">
          <UUIDInput />
        </div>
      </Container>
    );
  }
}

export default App;
