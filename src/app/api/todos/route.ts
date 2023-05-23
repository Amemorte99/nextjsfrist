import { NextResponse } from "next/server";



const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos"

export async function GET() {

    const res= await fetch(DATA_SOURCE_URL)

    const todos: Todo[] =  await res.json()

    return NextResponse.json(todos)
} 

const Api_key: string = "DaveGrayTeachesCode"

export async function DELETE(resquet:Request) {

    const {id} : Partial<Todo>= await resquet.json()



    if(!id) return NextResponse.json({"message":"Todo id required"})

    await fetch(`${DATA_SOURCE_URL}/${id}`,{
        method:'DELETE',
        headers: {
            'Content-Type':'application/json',
            'API-Key':Api_key
        }

    }) 

    return NextResponse.json({
        "message": 'Todo ${id} à été supprimer'
    })
} 



export async function POST(resquet:Request) {

    const {userId,title} : Partial<Todo>= await resquet.json()

    if(!userId || !title) return NextResponse.json({"message":"Missing required data"})

    const res =await fetch(DATA_SOURCE_URL,{
        method:'POST',
        headers: {
            'Content-Type':'application/json',
            'API-Key':Api_key
        },
        body: JSON.stringify({

            userId,title,completed:false
        })

    }) 
    const newTodo: Todo =await res.json()

    return NextResponse.json({
       newTodo
    })
} 



export async function PUT(resquet:Request) {

    const {userId,id,title,completed} : Todo= await resquet.json()

    if(!userId || !id || !title || typeof(completed)!=='boolean') return NextResponse.json({"message":"Missing required data","status":false})

    const res =await fetch(`${DATA_SOURCE_URL}/${id}`,{
        method:'PUT',
        headers: {
            'Content-Type':'application/json',
            'API-Key':Api_key
        },
        body: JSON.stringify({

            userId,title,completed
        })

    }) 
    const updateTodo: Todo =await res.json()

    return NextResponse.json({
        updateTodo,"status":true
    })
} 