
const sortSwitch = async(req, res, next) => {
    
    switch (req.body.sort) {
        case "all_ascending":
            req.body.sort = 1;
            break;

        case "all_descending":
            req.body.sort = -1;
            break;

        default:
            req.body.sort = 0;
            break;
    }

    next()
}

export default sortSwitch;