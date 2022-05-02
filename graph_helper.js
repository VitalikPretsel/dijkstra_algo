let temp_cells, temp_adj;

class GraphHelper {
    constructor(graph, visualizer, menu) {
        this.graph = graph;
        this.visualizer = visualizer;
        this.graph.visualizer = visualizer;
        this.graph.menu = menu;
        this.menu = menu;
    }

    CheckTemp() {
        if (temp_cells != null && temp_adj != null) {
            this.visualizer.cells = temp_cells;
            this.graph.adj = temp_adj;

            this.visualizer.connections = [];
            for (let i = 0; i < this.graph.adj.length; i++) {
                for (let j = 0; j < this.graph.adj[i].length; j++) {
                    if (this.graph.adj[i][j] != Number.MAX_VALUE) {
                        this.visualizer.connections.push(new Connection(this.visualizer.cells[i], this.visualizer.cells[j], this.graph.adj[i][j], true));
                    }
                }
            }

            temp_cells = temp_adj = null;
        }
    }

    AddEdge() {
        let vertex_label_1 = this.menu.edgeMenu[0].value();
        let vertex_label_2 = this.menu.edgeMenu[1].value();
        let is_directed = this.menu.edgeMenu[5].value() == "directed";

        if (vertex_label_1 == '' && vertex_label_2 == '') {
            return;
        }

        let cell1_obj = this.visualizer.getCell(vertex_label_1);
        let cell2_obj = this.visualizer.getCell(vertex_label_2);

        let cell1, cell2;
        let v1_index, v2_index;

        if (!cell1_obj) {
            v1_index = this.graph.addVertex();
            cell1 = new Cell(this.menu.edgeMenu[0].value());
            this.visualizer.cells.push(cell1);
        }
        else {
            cell1 = cell1_obj.cell;
            v1_index = cell1_obj.index;
        }
        if (!cell2_obj) {
            v2_index = this.graph.addVertex();
            cell2 = new Cell(this.menu.edgeMenu[1].value());
            this.visualizer.cells.push(cell2);
        }
        else {
            cell2 = cell2_obj.cell;
            v2_index = cell2_obj.index;
        }

        if (!this.graph.edgeExists(v1_index, v2_index)) {
            this.graph.addEdge(v1_index, v2_index, this.menu.edgeMenu[2].value());
            this.visualizer.connections.push(new Connection(cell1, cell2, this.menu.edgeMenu[2].value(), true));
        }
        if (!is_directed) {
            if (!this.graph.edgeExists(v2_index, v1_index)) {
                this.graph.addEdge(v2_index, v1_index, this.menu.edgeMenu[2].value());
                this.visualizer.connections.push(new Connection(cell2, cell1, this.menu.edgeMenu[2].value(), true));
            }
        }
    }

    DelEdge() {
        let vertex_label_1 = this.menu.edgeMenu[0].value();
        let vertex_label_2 = this.menu.edgeMenu[1].value();
        let is_directed = this.menu.edgeMenu[5].value() == "directed";

        if (vertex_label_1 == '' && vertex_label_2 == '') {
            return;
        }

        let cell1_obj = this.visualizer.getCell(vertex_label_1);
        let cell2_obj = this.visualizer.getCell(vertex_label_2);

        let cell1, cell2;
        let v1_index, v2_index;

        if (!cell1_obj || !cell2_obj) {
            return;
        }
        else {
            cell1 = cell1_obj.cell;
            cell2 = cell2_obj.cell;
            v1_index = cell1_obj.index;
            v2_index = cell2_obj.index;
        }

        if (this.graph.edgeExists(v1_index, v2_index)) {
            this.graph.delEdge(v1_index, v2_index);
            this.visualizer.removeConnection(cell1, cell2);
        }

        if (!is_directed) {
            if (this.graph.edgeExists(v2_index, v1_index)) {
                this.graph.delEdge(v2_index, v1_index);
                this.visualizer.removeConnection(cell2, cell1);
            }
        }
    }

    AddVertex() {
        let vertex_label = this.menu.vertexMenu[0].value();

        if (vertex_label == '') {
            return;
        }

        let cell_obj = this.visualizer.getCell(vertex_label);

        if (cell_obj) {
            return;
        }

        let cell;
        let v_index;

        v_index = this.graph.addVertex();
        cell = new Cell(this.menu.vertexMenu[0].value());
        this.visualizer.cells.push(cell);
    }

    DelVertex() {
        let vertex_label = this.menu.vertexMenu[0].value();

        if (vertex_label == '') {
            return;
        }

        let cell_obj = this.visualizer.getCell(vertex_label);

        let cell;
        let v_index;

        if (!cell_obj) {
            return;
        }
        else {
            cell = cell_obj.cell;
            v_index = cell_obj.index;
        }

        this.graph.delVertex(v_index);
        this.visualizer.removeCell(cell);
    }


    async Start() {
        if (this.menu.startMenu[0].value() == '' && this.menu.startMenu[1].value() == '') {
            return;
        }

        this.menu.resultTextArea.value('');
        this.menu.solutionTextArea.value('');

        let cell_start_obj = this.visualizer.getCell(this.menu.startMenu[0].value());
        let cell_finish_obj = this.visualizer.getCell(this.menu.startMenu[1].value());

        let cell_start, cell_finish;
        let v_start_index, v_finish_index;

        if (cell_start_obj && cell_finish_obj) {
            v_start_index = cell_start_obj.index;
            v_finish_index = cell_finish_obj.index;
            cell_start = cell_start_obj.cell;
            cell_finish = cell_finish_obj.cell;
            this.graph.startSearch(v_start_index, v_finish_index, this.menu.startMenu[3].value());
        }
    }


    save_file() {
        saveJSON(this.visualizer.cells, this.menu.saveMenu[0].value() + "_cells.json");
        saveJSON(this.graph.adj, this.menu.saveMenu[0].value() + "_adj.json");
    }

    load_cells_file(file_name) {
        loadJSON(file_name, this.fill_cells);
    }

    fill_cells(cells_json) {
        temp_cells = [];
        for (let i = 0; i < cells_json.length; i++) {
            temp_cells.push(new Cell(cells_json[i].label, cells_json[i].x, cells_json[i].y));
        }
    }

    load_adj_file(file_name) {
        loadJSON(file_name, this.fill_adj);
    }

    fill_adj(adj_json) {
        temp_adj = adj_json;
    }
}

const delay = ms => new Promise(res => setTimeout(res, ms));
