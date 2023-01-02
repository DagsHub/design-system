import '../../styles/modal.scss'

export default function Modal() {
    return (
        <div className="modal__add-member-modal add-member-modal add-member-modal_border">
            <div className="add-member-modal__x-button">
                <img src="./assets/x-button.svg"></img>
            </div>
            <div className="modal-content">
                <p className="modal-content__title">
                    Add new member to DevOps team
                </p>
                <p className="modal-content__instructions">
                    Search by username or name or enter email address to invite someone outside Dagshub
                </p>
                {/* <img src="./assets/search-icon.svg"></img> */}
                <input className="search-input" type="text" placeholder="Enter username or email">               
                </input>
                <button className="desktop-default-button desktop-default-button_primary modal-content__desktop-default-button-primary">
                    Add new team member
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