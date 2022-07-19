class Queue
{
    // Array is used to implement a Queue
    constructor()
    {
        this.items = [];
    }

    dequeue()
{
    // removing element from the queue
    // returns underflow when called 
    // on empty queue
    if(this.isEmpty())
        return "Underflow";
    return this.items.shift();
}
enqueue(element)
{    
    // adding element to the queue
    this.items.push(element);
}
isEmpty()
{
    // return true if the queue is empty.
    return this.items.length == 0;
}
front()
{
    // returns the Front element of 
    // the queue without removing it.
    if(this.isEmpty())
        return "No elements in Queue";
    return this.items[0];
}
}
function find_paths(paths,path,parent,n,u){
    console.log(paths)
    if(u==-1){
        paths.push(path.copy())
        return
    }
    for(const par in parent[u]){
        path.push(u)
        find_paths(paths,path,parent,n,par)
        path.pop()
    }

}
function bfs(adj,parent,n,s){
    dist = new Array(n)
    for (let i = 0;i<n;i++){
        dist[i] = Number.POSITIVE_INFINITY
    }
    
    q =new Queue()
    q.enqueue(s)
    parent[s] = [-1]
    dist[s] = 0
    while(q.isEmpty() === false){
        
        u = q.dequeue()
        for(const v in adj[u]){
            if(dist[v] > dist[u]+1){
                dist[v] = dist[u] + 1
                q.enqueue(v)
                parent[v] = []
                parent[v].push(u)
            }
            else if(dist[v] === dist[u]+1){
                parent[v].push(u)
            }
        }

    }
}
function print_paths(adj,n,s,e){
    let paths = []
    let path  = []
    let parent = new Array(n)
    for (let i = 0;i<n;i++){
        parent[i] = []
    }
    
    bfs(adj,parent,n,s)
    find_paths(paths,path,parent,n,e)
    console.log(paths)
    for (const v in paths){
        console.log(v)
        v = paths[v].reverse()
        console.log(v)
        for(const u in v){
            console.log(u)
        }
        console.log(" ")


    }
}
adj = [
    [1,2],
    [0,3,4],
    [0,3],
    [1,2,5],
    [1,5],
    [3,4]
    ]
print_paths(adj, 6, 2, 4)