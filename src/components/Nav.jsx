// rrd imports
import { Form, NavLink } from "react-router-dom"

import homeButton from "../assets/homeButton.png"

import {TrashIcon, HomeIcon} from '@heroicons/react/20/solid'

const Nav = ({userName}) => {
    return (
        <nav>
            <div className="flex items-center justify-between p-4">
                <NavLink to="/" aria-label="Go to Home" className="flex items-center gap-2">
                    <HomeIcon width={25} />
                    <span>Budgie</span>
                </NavLink>
                {
                    userName && (
                        <Form method="post" action="/logout" onSubmit={(event) => {
                            if (!confirm("Delete all user data?")) {
                                event.preventDefault() // prevents refresh on submit
                            }
                        }}>
                            <button type="submit" className="btn btn--warning flex items-center gap-2">
                                <span>Delete User</span>
                                <TrashIcon width={25} />
                            </button>
                        </Form>
                    )
                }
            </div>
        </nav>
    )
}

export default Nav

