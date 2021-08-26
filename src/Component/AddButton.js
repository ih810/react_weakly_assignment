import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default class AddButton extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            modal: false,
            name: "",
            tags: [],
            url: "",
        };
    }

    //toggle the modal open or close
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    //same as onAddButtonAddLink?
    addLink = () => {
        this.props.onAddLink(this.state.name, this.state.url, this.state.tags)
        this.setState({
            name: "",
            url: "",
            tags: [],
            modal: false,
        });
    };

    addTag = () => {
        this.setState({
            tags: this.state.tags.concat([{ name: "" }]),
        });
    };

    onTagChange = (i, e) => {
        const tags = this.state.tags.slice();
        tags[i] = {
            name: e.currentTarget.value,
        };
        this.setState({
            tags: tags,
        });
    };

    onNameChange = (e) => {
        this.setState({
            name: e.currentTarget.value,
        });
    };

    onUrlChange = (e) => {
        this.setState({
            url: e.currentTarget.value, 
        });
    };

    render(){
        return(
            <>
            <Button color="secondary" onClick={this.toggle}>
                Add Link
            </Button>
            <Modal className="modal" isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader> Add Link Form </ModalHeader>
                <ModalBody>
                    <label>Name:</label>
                    <br />
                    <input
                    type="text"
                    value={this.state.name}
                    onChange={this.onNameChange}
                    />
                    <br />
                    <label>URL:</label>
                    <input
                    type="text"
                    value={this.state.url}
                    onChange={this.onUrlChange}
                    />
                    <br />
                    <label>Tags:</label>
                    <br />
                    {/* isn't this an input field? why do we need to map? */}
                    {this.state.tags.map((tag, i) => {
                        return (
                            <input
                            key={i}
                            type="text"
                            //why do we need to bind this?
                            onChange={this.onTagChange.bind(this, i)}
                            value={tag.name}
                            />
                        )
                    })}
                    <br />
                    <Button color="secondary" onClick={this.addTag}>
                        Add Tag
                    </Button>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.addLink}>
                        Submit
                    </Button>
                    <Button color="danger" onClick={this.toggle}>
                        Cancel{" "}
                    </Button>
                </ModalFooter>
            </Modal>
            </>
        )
    }
}