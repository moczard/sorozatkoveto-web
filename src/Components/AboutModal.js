import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';



class AbotModal extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: true,
        };

    }

    static contextTypes = {
        router: () => true,
    }


    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        return (
            <Modal show={this.state.show} onHide={this.context.router.history.goBack}>
                <Modal.Header closeButton>
                    <Modal.Title>About</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>How to use?</h4>
                    <p>
                        You can follow your favourite series and mark episodes, that you have seen already. Also you can rate
                        the the your favourites.
                    </p>
                    <p>
                        On the Search tab you can search among all the series and episodes. You can do it by title or by the genre of the series.
                    </p>
                    <hr />
                    <p>
                        This is a homework project created by <b>Mózcár Dávid</b> and <b>Sabó Benedek.</b>
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.context.router.history.goBack}>Close</Button>
                </Modal.Footer>
            </Modal>

        );
    }
}


export default AbotModal;
