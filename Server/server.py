#import the libraries
import asyncio
import websockets

#defines an empty set
connected = set()

#Asynchronous Function
async def handler(websocket, path):
    #Adds the new client to the list of connected clients
    connected.add(websocket)
    try:
        async for message in websocket:
            #Forwards the received message to all other connected clients
            for conn in connected:
                if conn != websocket:
                    await conn.send(message)
    finally:
        #Removes the client from the list of connected clients when disconnecting
        connected.remove(websocket)

#Starts the WebSocket server
start_server = websockets.serve(handler, 'localhost', 8080)

#Runs the server until stopped
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()