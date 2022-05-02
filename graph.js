class Graph {
    constructor() {
        this.adj = [];
        this.result = [];
        this.solution = [];
        this.success = false;
        this.start_index = -1;
        this.finish_index = -1;
        this.visualizer = null;
        this.menu = null;
        this.delay = 0;
    }

    addVertex() {
        this.adj.push(new Array(this.adj.length).fill(Number.MAX_VALUE));
        for (let i = 0; i < this.adj.length; i++) {
            this.adj[i].push(Number.MAX_VALUE);
        }
        return this.adj.length - 1;
    }

    delVertex(v_index) {
        this.adj.splice(v_index, 1);
        for (let i = 0; i < this.adj.length; i++) {
            this.adj[i].splice(v_index, 1);
        }
    }

    addEdge(v_index1, v_index2, value = 0) {
        this.adj[v_index1][v_index2] = value;
    }

    delEdge(v_index1, v_index2) {
        this.adj[v_index1][v_index2] = Number.MAX_VALUE;
    }

    edgeExists(v_index1, v_index2) {
        return this.adj[v_index1][v_index2] != Number.MAX_VALUE;
    }


    minDistance(dist, sptSet) {
        let min = Number.MAX_VALUE;
        let min_index = -1;

        for (let v = 0; v < this.adj.length; v++) {
            if (sptSet[v] == false && dist[v] <= min) {
                min = dist[v];
                min_index = v;
            }
        }
        return min_index;
    }


    async dijkstra() {
        let dist = new Array(this.adj.length);
        let sptSet = new Array(this.adj.length);

        for (let i = 0; i < this.adj.length; i++) {
            dist[i] = Number.MAX_VALUE;
            sptSet[i] = false;
        }

        dist[this.start_index] = 0;

        for (let count = 0; count < this.adj.length; count++) {
            await delay(this.delay);

            let u = this.minDistance(dist, sptSet);
            sptSet[u] = true;

            this.visualizer.cells[u].status = 'visited';
            this.result.push(this.visualizer.cells[u].label);

            if (this.finish_index == u) {
                if (dist[u] != Number.MAX_VALUE) {
                    this.success = true;
                }
                else {
                    this.visualizer.cells[u].status = 'unreachable';
                    this.success = false;
                    break;
                }
            }
            else {
                this.visualizer.cells[u].status = 'visited';
            }

            for (let v = 0; v < this.adj.length; v++) {
                if (!sptSet[v] && this.adj[u][v] != Number.MAX_VALUE &&
                    dist[u] != Number.MAX_VALUE &&
                    Number(dist[u]) + Number(this.adj[u][v]) < dist[v]) {
                    dist[v] = Number(dist[u]) + Number(this.adj[u][v]);
                }

                this.visualizer.cells[v].distance = (dist[v] == Number.MAX_VALUE) ? '∞' : dist[v];
            }
        }


        this.menu.resultTextArea.value(this.result);
        if (this.success) {
            this.visualizer.cells[this.finish_index].status = 'solution';
            this.solution.unshift(this.visualizer.cells[this.finish_index].label);
            let prev_index = this.finish_index;
            for (let count = 0; count < this.visualizer.cells.length; count++) {
                await delay(this.delay);

                let min = Number.MAX_VALUE;
                let min_index = -1;

                for (let v = 0; v < this.adj.length; v++) {
                    if (this.visualizer.cells[v].status != 'solution' && dist[v] <= min &&
                        this.adj[prev_index][v] != Number.MAX_VALUE) {
                        min = this.visualizer.cells[v].distance;
                        min_index = v;
                    }
                }

                this.solution.unshift(this.visualizer.cells[min_index].label);
                this.visualizer.cells[min_index].status = 'solution';
                prev_index = min_index;

                if (this.visualizer.cells[min_index] == this.visualizer.cells[this.start_index]) {
                    break;
                }
            }
            this.menu.solutionTextArea.value("Path length: " + dist[this.finish_index] + "\n" + this.solution);
        }
        else {
            this.menu.solutionTextArea.value("Path not found");
        }
    }


    startSearch(start_index, finish_index, delay) {
        this.result = [];
        this.solution = [];
        this.start_index = start_index;
        this.finish_index = finish_index;
        this.success = false;
        this.delay = delay;
        for (let i = 0; i < this.visualizer.cells.length; i++) {
            this.visualizer.cells[i].status = 'unvisited';
            this.visualizer.cells[i].distance = '∞';
        }

        this.dijkstra();
    }
}
