import '../../styles/modal.scss'
import '../../styles/root.scss'

export default function Modal(props:any) {
    return (
        <div className="modal__add-member-modal add-member-modal add-member-modal_border">
            <div className="add-member-modal__x-button">
                <img src="./assets/x-button.svg"></img>
            </div>
            <div className="modal-content">
                <p className="modal-content__title">
                    Add new {props.isOrg && props.isAdmin? "organization admin" : "member"} to {props.name} {props.isTeam? " team":""}
                </p>
                <p className="modal-content__instructions">
                    Search by username or name or enter email address to invite someone outside {props.name}
                </p>
                {/* <img src="./assets/search-icon.svg"></img> */}
                <input className="search-input" type="text" placeholder="Enter username or email">               
                </input>
                <button className="desktop-default-button desktop-default-button_primary modal-content__desktop-default-button-primary">
                    Add new {props.isTeam? "team" : "organization"} {props.isOrg && props.isAdmin? "admin":"member"}
                </button>
                <p className="modal-content__or">
                    or
                </p>
                <button className="desktop-default-button desktop-default-button_secondary">
                    Copy invitation link
                </button>
            </div>
        </div>
    )
}

//make it more generic
//add functionality to search input (should be received as props)
//when clicking on the input there should be written "Typing..."
//add search icon to input
//add more part from the rest of the models in Anna's design