import Typography from "@material-ui/core/Typography";

const MinimizedTask = ({name, price, description, location, deadline, email, phone}) => {
    return (
        <div>
            <Typography gutterBottom variant="h5" component="h2" align="left" noWrap>
                {name.toUpperCase()}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                align="left"
              >
                <b>Price: </b> ${price}
              </Typography>

              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                align="left"
              >
                <b>Deadline: </b> {deadline}
              </Typography>

              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                align="left"
              >
                <b>Address: </b> {location}
              </Typography>

              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                align="left"
                noWrap
              >
                <b>Description: </b>{description}
              </Typography>

              <hr/>

              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                align="left"
              >
                <b>Contact Info</b>
              </Typography>

              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                align="left"
              >
                <b>Email: </b>{email}
              </Typography>

              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                align="left"
              >
                <b>Phone: </b>{phone}
              </Typography>
        </div>
    )
}

export default MinimizedTask
