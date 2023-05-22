import { NextResponse } from "next/server";



const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos"

export async function GET() {

    const res= await fetch(DATA_SOURCE_URL)

    const todos: Todo[] =  await res.json()

    return NextResponse.json(todos)
} 

const Api_key: string = process.env.DATA_API_key

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