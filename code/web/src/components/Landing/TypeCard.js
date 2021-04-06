import React from 'react'
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";


import Typography from "@material-ui/core/Typography";
import { Card, CardActionArea, CardMedia } from "@material-ui/core";
import default_img from "../../image/car_wash.jpeg";

const TypeCard = ({img, type}) => {
    return (
        <div>
            <div className="col" style={{ marginBottom:'1%' }}>
                <Card className="hoverable" style={{ width: 350 }}>
                    <CardActionArea>
                        <CardMedia
                                component="img"
                                height="140"
                                image={img}
                                title="Task Image"
                                />
                        <CardContent>
                        <Typography gutterBottom variant="h6" component="h2" align="left" noWrap>
                            {type.toUpperCase()}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        </div>
    )
}

TypeCard.defaultProps = {
    img: default_img,
    type: "",
    description: "",
  }

export default TypeCard
