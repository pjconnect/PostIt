import React, {Component} from 'react';
import {Container} from 'reactstrap';
import NavMenu from "../components/NavMenu";

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div className={"bg-gray-50"}>
                <NavMenu/>
                <Container tag="main">
                    {this.props.children}
                </Container>
            </div>
        );
    }
}
