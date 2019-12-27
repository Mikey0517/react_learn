import React, { Component } from 'react';
import { Layout, Select, Button, Form } from 'element-react';
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
		this.handleReset = this.handleReset.bind( this );
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

	handleReset () {
		this.reset();
	}

	render () {
		const { level, mine } = this.state;
		return (
			<div className='mine-sweeping'>
				<Layout.Row>
					<Form inline>
						<Form.Item label="难度：">
							<Select value={ this.state.level } placeholder="请选择" onChange={ this.handleSelectChange }>
								{
									this.levelList.map( el => <Select.Option key={ el.value } label={ el.label } value={ el.value }/> )
								}
							</Select>
						</Form.Item>
						<Form.Item label="雷：">
							{ mine }
						</Form.Item>
						<Form.Item>
							<Button type="danger" onClick={ this.handleReset }>重置</Button>
						</Form.Item>
					</Form>
				</Layout.Row>
				<Layout.Row>
					<Layout.Col span="24">
						<MineSweepingPanel
							level={ level }
							onChange={ this.handleMineChange }
							trigger={ trigger => this.reset = trigger.reset }
						/>
					</Layout.Col>
				</Layout.Row>
			</div>
		)
	}
}

export default MineSweeping;