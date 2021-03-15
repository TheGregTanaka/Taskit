function CreateTask (){
    return(
        <>
            <center>
                <h5>Create a Task</h5>
            </center>
            <div>
                <form>
                    <label>
                        Task name: 
                        <input type="text" name="task_name"/>
                    </label>
                    <label>
                        Price:
                        <input type="number" name="task_price" placeholder="USD"/>
                    </label>
                    <label>
                        Description: 
                        {/* <input type="text" name="task_desc" maxLength="1200" placeholder="I will"/> */}
                        <br/>
                        <textarea id="task_desc" maxLength="1200" style={{width:"100%", height:"150px"}} placeholder={"I will"}/>
                    </label>
                    <label>
                        Location: 
                        <input type="text" name="task_loc"/>
                    </label>
                    <label>
                        Deadline: 
                        <input type="date" name="task_deadline"/>
                    </label>
                    <label>
                        Image:
                        <br/>
                        <input type="file" id="img" name="task_img" accept="image/*"></input>
                    </label>
                    
                </form>
            </div>
        </>
    )
}
export default CreateTask;