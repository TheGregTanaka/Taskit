export const TypeID = {
  Yrd: 1,
  Cln: 2,
  Rpr: 3,
  Ato: 4,
  Tch: 5,
  Msc: 6
}

export const Types = [
    {id: TypeID.Yrd, abbr: "Yrd", name: "Yard Work", img: "http://localhost:3200/img/static/yard.jpeg"},
    {id: TypeID.Cln, abbr: "Cln", name: "Cleaning", img: "http://localhost:3200/img/static/cleaning.png"},
    {id: TypeID.Rpr, abbr: "Rpr", name: "Repair", img: "http://localhost:3200/img/static/repair.jpeg"},
    {id: TypeID.Ato, abbr: "Ato", name: "Auto", img: "http://localhost:3200/img/static/auto.jpeg"},
    {id: TypeID.Tch, abbr: "Tch", name: "Tech", img: "http://localhost:3200/img/static/tech.jpeg"},
    {id: TypeID.Msc, abbr: "Msc", name: "Misc", img: "http://localhost:3200/img/static/taskitthumbnail.png"},
];

export const GetType = (id) => {
  return Types[id - 1];
}
