import React from "react";

type Props = {
    firstname?: string
    lastname?: string
    email?: string
}

const UserNameContainer = ({firstname, lastname, email}: Props): JSX.Element => {
    return (
        <>
            <h3 style={{fontSize: 19}}>{firstname} {lastname}
                &nbsp;
                <span
                    style={{ color: 'gray', fontWeight: '400' }}
                >
                        ({email})
                    </span>
            </h3>
        </>
    );
}

export default UserNameContainer;