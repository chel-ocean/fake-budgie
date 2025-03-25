// rrd imports
import { Form, NavLink } from "react-router-dom"

import {TrashIcon, HomeIcon} from '@heroicons/react/20/solid'

const Nav = ({userName}) => {
    return (
        <nav>
            <NavLink to="/" aria-label="Go to Home">
                <HomeIcon width={25} />
                <span className="text-4xl">Budgie</span>
            </NavLink>
            {
                userName && (
                    <Form method="post" action="/logout" onSubmit={(event) => {
                        if (!confirm("Delete all user data?")) {
                            event.preventDefault() // prevents refresh on submit
                        }
                    }}>
                        <button type="submit" className="btn btn--warning">
                            <span>Delete User</span>
                            <TrashIcon width={25} />
                        </button>
                    </Form>
                )
            }
        </nav>
    )
}

export default Nav

