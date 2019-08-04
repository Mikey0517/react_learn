import React, { Component } from 'react';
import { Layout, Select, Tag } from 'element-react';
import DefaultLayout from '../layout/defaultLayout';
import { MineSweepingPanel } from '../component';
import '../assets/css/mineSweeping.css';

class MineSweeping extends Component {
  constructor ( props ) {
    super( props );
    this.state = {
      level: 'primary',
      mine: 0
    };
    this.handleSelectChange = this.handleSelectChange.bind( this );
    this.handleMineChange = this.handleMineChange.bind( this );
    this.levelList = [
      {
        value: 'primary',
        label: '初级'
      },
      {
        value: 'middle',
        label: '中级'
      },
      {
        value: 'senior',
        label: '高级'
      }
    ]
  }

  handleSelectChange ( level ) {
    this.setState( { level } );
  }

  handleMineChange ( mine ) {
    this.setState( { mine } );
  }

  render () {
    const { level, mine } = this.state;
    return (
      <DefaultLayout { ...this.props }>
        <div className='mine-sweeping'>
          <Layout.Row>
            <Layout.Col span="19">
              <Select value={ this.state.level } placeholder="请选择" onChange={ this.handleSelectChange }>
                {
                  this.levelList.map( el => {
                    return <Select.Option key={ el.value } label={ el.label } value={ el.value }/>
                  } )
                }
              </Select>
            </Layout.Col>
            <Layout.Col span="5">
              <Tag>{ `雷：${ mine }` }</Tag>
            </Layout.Col>
          </Layout.Row>
          <Layout.Row>
            <Layout.Col span="24">
              <MineSweepingPanel
                level={ level }
                onChange={ this.handleMineChange }
              />
            </Layout.Col>
          </Layout.Row>
        </div>
      </DefaultLayout>
    )
  }
}

export default MineSweeping;