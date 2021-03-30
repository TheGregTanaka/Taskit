import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Card, CardActionArea, CardMedia, CardContent, CardActions } from "@material-ui/core";
import img from "../../image/car_wash.jpeg";

const MinimizedTask = ({name, price, description, location, deadline, email, phone}) => {
    return (
        <div>
            {/* <Typography gutterBottom variant="h5" component="h2" align="left" noWrap>
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
              </Typography> */}
              <Card style={{ width: 300 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={img}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" align="left">
                      {name} - <b>{price}</b>
                      {name} - <b>${price}</b>
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h2" align="left">
                      {location}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      align="left"
                    >
                      {description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
        </div>
    )
}

export default MinimizedTask



{/* <Card style={{ width: 300 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={img}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" align="left">
              {name} - <b>{price}</b>
              {name} - <b>${price}</b>
            </Typography>
            <Typography gutterBottom variant="h6" component="h2" align="left">
              {location}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              align="left"
            >
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" variant="outlined">
            Learn More
          </Button>
        </CardActions>
      </Card>
    );
  }
}

Task.defaultProps = {
  img: imag,
  name: 'default title',
  price: 'default price', 
  description: 'default description',
  location: 'default location',
  deadline: 'deadline'
}
export default Task; */}