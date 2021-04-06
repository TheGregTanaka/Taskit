import React from 'react'
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { Card, CardActionArea, CardMedia } from "@material-ui/core";

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
    type: "",
    description: "",
  }

export default TypeCard
