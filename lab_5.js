var menu_interface;
var graph;
var graph_visualizer;
var graph_helper;

function setup() {
    createCanvas(1050, 800);

    menu_interface = new MenuInterface();

    InitAll();
}

function InitAll() {
    graph = new Graph();
    graph_visualizer = new GraphVisualizer();
    graph_helper = new GraphHelper(graph, graph_visualizer, menu_interface);

    menu_interface.resultTextArea.value('');
    menu_interface.solutionTextArea.value('');

    menu_interface.vertexMenu[1].mousePressed(GraphHelperAddVertex);
    menu_interface.vertexMenu[2].mousePressed(GraphHelperDelVertex);
    menu_interface.edgeMenu[3].mousePressed(GraphHelperAddEdge);
    menu_interface.edgeMenu[4].mousePressed(GraphHelperDelEdge);
    menu_interface.startMenu[2].mousePressed(GraphHelperStart);
    menu_interface.clearMenu[0].mousePressed(InitAll);

    menu_interface.saveMenu[1].mousePressed(GraphHelperSave);
    var input1 = createFileInput(HandleCellsFile);
    input1.position(width + 10, 270);
    var input2 = createFileInput(HandleAdjFile);
    input2.position(width + 10, 300);
    let cellsFileMenuText = createElement('h6', 'Cells');
    cellsFileMenuText.position(width + 200, 250);
    let adjFileMenuText = createElement('h6', 'Adj');
    adjFileMenuText.position(width + 200, 280);
}

function GraphHelperAddEdge() {
    graph_helper.AddEdge();
}

function GraphHelperDelEdge() {
    graph_helper.DelEdge();
}

function GraphHelperAddVertex() {
    graph_helper.AddVertex();
}

function GraphHelperDelVertex() {
    graph_helper.DelVertex();
}

function GraphHelperAutoGenerate() {
    graph_helper.AutoGenerateGraph();
}

function GraphHelperStart() {
    graph_helper.Start();
}

function GraphHelperSave() {
    graph_helper.save_file();
}

function HandleCellsFile(file) {
    graph_helper.load_cells_file(file.name);
}
function HandleAdjFile(file) {
    graph_helper.load_adj_file(file.name);
}

function draw() {
    background(200);

    graph_helper.CheckTemp();
    graph_visualizer.GraphDraw();
}

function mousePressed() {
    graph_visualizer.GraphMousePressed();
}

function mouseDragged() {
    graph_visualizer.GraphMouseDragged();
}

function mouseReleased() {
    graph_visualizer.GraphMouseReleased();
}
