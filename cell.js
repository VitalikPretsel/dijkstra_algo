class Cell {
    constructor(label, x = -1, y = -1) {
        this.x = x == -1 ? random(width) : x;
        this.y = y == -1 ? random(height) : y;
        this.label = label;
        this.status = 'unvisited';
        this.distance = '∞';

        this.flags = {
            hover: false,
            dragging: false,
        };

        this.radius = 15;
    }

    render() {
        this.render_circle();
        this.render_text();
    }

    render_text() {
        fill(255);
        textSize(15);
        let dy = (textWidth(this.label) <= 40) ? ((textAscent() + textDescent()) / 4) : -((textAscent() + textDescent()) / 2);
        text(this.label, this.x - (textWidth(this.label) / 2), this.y + dy);
        noStroke();
        fill(0);
        text(this.distance, this.x + this.radius + 3, this.y + ((textAscent() + textDescent()) / 4));
    }

    render_circle() {
        stroke(0);
        strokeWeight(2);

        rectMode(CENTER);
        fill(255);
        rect(this.x + this.radius + 20, this.y, 60, 20);

        if (this.status == 'visited') {
            fill(80, 200, 80);
        }
        else if (this.status == 'unreachable') {
            fill(255, 11, 20);
        }
        else if (this.status == 'solution') {
            fill(255, 211, 0);
        }
        else {
            fill(255);
        }
        if (this.flags.hover) {
            strokeWeight(3);
        }
        if (this.flags.dragging) {
            fill(100, 255, 255);
        }

        ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    }

    isInside(x, y) {
        const d = dist(this.x, this.y, x, y);
        return d <= this.radius;
    }

}
