import React from 'react'
import { useHistory } from 'react-router';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {TypeID, Types, GetType } from '../../constants/tasks';

import { Card, CardActionArea, CardMedia } from "@material-ui/core";

const TypeCard = ({typeID}) => {
  const history = useHistory();
  const type = GetType(typeID);
  const handleClick = () => {
    history.push("/feed?t=" + type.abbr);
  }
    return (
        <div>
            <div className="col" style={{ marginBottom:'3%' }}>
                <Card className="hoverable" style={{ width: 350 }}>
                    <CardActionArea onClick={handleClick}>
                        <CardMedia
                                component="img"
                                height="140"
                                image={type.img}
                                title="Task Image"
                                />
                        <CardContent>
                        <Typography gutterBottom variant="h6" component="h2" align="left" noWrap>
                            {type.name.toUpperCase()}
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
