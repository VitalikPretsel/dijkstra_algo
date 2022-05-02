class MenuInterface {
    constructor() {
        this.vertexMenu = [];
        {
            this.vertexMenu[0] = createInput();
            this.vertexMenu[1] = createButton('Add');
            this.vertexMenu[2] = createButton('Remove');

            this.vertexMenu[0].position(width + 10, 40);
            this.vertexMenu[0].style('width', '80px');
            this.vertexMenu[1].position(width + 100, 40);
            this.vertexMenu[1].style('width', '80px');
            this.vertexMenu[2].position(width + 190, 40);
            this.vertexMenu[2].style('width', '80px');

            let vertexMenuText = createElement('h6', 'Vertex');
            vertexMenuText.position(width + 10, 0);
        }


        this.edgeMenu = [];

        {
            this.edgeMenu[0] = createInput();
            this.edgeMenu[1] = createInput();
            this.edgeMenu[2] = createInput();
            this.edgeMenu[3] = createButton('Add edge');
            this.edgeMenu[4] = createButton('Remove edge');

            this.edgeMenu[0].position(width + 10, 90);
            this.edgeMenu[0].style('width', '80px');
            this.edgeMenu[1].position(width + 100, 90);
            this.edgeMenu[1].style('width', '80px');
            this.edgeMenu[2].position(width + 190, 90);
            this.edgeMenu[2].style('width', '80px');
            this.edgeMenu[3].position(width + 10, 140);
            this.edgeMenu[3].style('width', '125px');
            this.edgeMenu[4].position(width + 145, 140);
            this.edgeMenu[4].style('width', '125px');

            let edgeMenuText1 = createElement('h6', 'First vertex');
            edgeMenuText1.position(width + 10, 50);
            let edgeMenuText2 = createElement('h6', 'Second vertex');
            edgeMenuText2.position(width + 100, 50);
            let edgeMenuText3 = createElement('h6', 'Value');
            edgeMenuText3.position(width + 190, 50);

            let radioDir = createRadio();
            radioDir.option('directed', 'directed');
            radioDir.option('undirected', 'undirected');
            radioDir.selected('undirected');
            radioDir.position(width + 10, 115);
            this.edgeMenu.push(radioDir);
        }

        this.clearMenu = [];
        this.startMenu = [];

        this.clearMenu[0] = createButton('Clear');
        this.clearMenu[0].position(width + 10, 200);
        this.clearMenu[0].style('width', '260px');


        let startMenuLabels = ['Start vertex', 'Finish vertex', 'Start'];
        CreateMenuGroupRow2(this.startMenu, startMenuLabels, 380);
        this.startMenu[3] = createInput();
        this.startMenu[3].position(width + 10, 380);
        this.startMenu[3].style('width', '80px');
        let startMenuText = createElement('h6', 'Step delay, ms');
        startMenuText.position(width + 10, 340);


        let menuResultText = createElement('h6', "Passed vertexes");
        menuResultText.position(width + 10, 440);
        this.resultTextArea = createElement('textarea');
        this.resultTextArea.attribute("rows", "3");
        this.resultTextArea.attribute("disabled", "disabled");
        this.resultTextArea.style('width', '260px');
        this.resultTextArea.position(width + 10, 480);

        let menuSolutionText = createElement('h6', "Found path");
        menuSolutionText.position(width + 10, 510);
        this.solutionTextArea = createElement('textarea');
        this.solutionTextArea.attribute("rows", "3");
        this.solutionTextArea.attribute("disabled", "disabled");
        this.solutionTextArea.style('width', '260px');
        this.solutionTextArea.position(width + 10, 550);


        this.saveMenu = [];
        let saveFileMenuLabels = ['FileName', 'Save'];
        CreateMenuGroupRow1(this.saveMenu, saveFileMenuLabels, 200);
        this.loadMenu = [];
    }
}

function CreateMenuGroupRow1(menuGroup, labels, row_Ypos) {
    menuGroup[0] = createInput();
    menuGroup[1] = createButton(labels[1]);

    menuGroup[0].position(width + 10, row_Ypos + 40);
    menuGroup[0].style('width', '170px');
    menuGroup[1].position(width + 190, row_Ypos + 40);
    menuGroup[1].style('width', '80px');

    let menuText = createElement('h6', labels[0]);
    menuText.position(width + 10, row_Ypos);
}

function CreateMenuGroupRow2(menuGroup, labels, row_Ypos) {
    menuGroup[0] = createInput();
    menuGroup[1] = createInput();
    menuGroup[2] = createButton(labels[2]);

    for (let i = 0; i < menuGroup.length; i++) {
        menuGroup[i].position(width + 10 + 90 * i, row_Ypos + 40);
        menuGroup[i].style('width', '80px');
    }

    let menuTextGroup = [];

    for (let i = 0; i < 2; i++) {
        menuTextGroup[i] = createElement('h6', labels[i]);
        menuTextGroup[i].position(width + 10 + 90 * i, row_Ypos);
    }
}
