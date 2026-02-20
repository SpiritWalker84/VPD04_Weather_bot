// Система существ с деревьями и интерактивными анимациями
(function() {
    var bgLayer = document.getElementById("bg-layer");
    if (!bgLayer) return;

    var trees = [];
    var creatures = [];

    function createTreeSVG(leftPercent) {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 100 200");
        svg.setAttribute("width", "100");
        svg.setAttribute("height", "200");
        svg.setAttribute("class", "tree-svg");
        svg.style.position = "absolute";
        svg.style.left = leftPercent + "%";
        svg.style.bottom = "0";
        svg.style.zIndex = "1";

        // Ствол
        var trunk = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        trunk.setAttribute("x", "40");
        trunk.setAttribute("y", "120");
        trunk.setAttribute("width", "20");
        trunk.setAttribute("height", "80");
        trunk.setAttribute("fill", "#5d4037");
        svg.appendChild(trunk);

        // Крона
        var crown = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        crown.setAttribute("cx", "50");
        crown.setAttribute("cy", "80");
        crown.setAttribute("rx", "35");
        crown.setAttribute("ry", "50");
        crown.setAttribute("fill", "#2e7d32");
        crown.setAttribute("class", "tree-crown");
        svg.appendChild(crown);

        // Дупло
        var hole = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        hole.setAttribute("cx", "50");
        hole.setAttribute("cy", "100");
        hole.setAttribute("rx", "8");
        hole.setAttribute("ry", "10");
        hole.setAttribute("fill", "#3e2723");
        hole.setAttribute("class", "tree-hole");
        svg.appendChild(hole);

        // Ветки для посадки птиц
        var branch1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        branch1.setAttribute("x1", "20");
        branch1.setAttribute("y1", "90");
        branch1.setAttribute("x2", "30");
        branch1.setAttribute("y2", "95");
        branch1.setAttribute("stroke", "#5d4037");
        branch1.setAttribute("stroke-width", "3");
        branch1.setAttribute("stroke-linecap", "round");
        svg.appendChild(branch1);

        var branch2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        branch2.setAttribute("x1", "80");
        branch2.setAttribute("y1", "85");
        branch2.setAttribute("x2", "70");
        branch2.setAttribute("y2", "90");
        branch2.setAttribute("stroke", "#5d4037");
        branch2.setAttribute("stroke-width", "3");
        branch2.setAttribute("stroke-linecap", "round");
        svg.appendChild(branch2);

        return {
            svg: svg,
            leftPercent: leftPercent,
            branch1Pos: { x: 25, y: 92.5 },
            branch2Pos: { x: 75, y: 87.5 },
            holePos: { x: 50, y: 100 }
        };
    }

    function createBirdSVG() {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 30 20");
        svg.setAttribute("width", "30");
        svg.setAttribute("height", "20");
        svg.setAttribute("class", "creature-bird-svg");

        var body = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        body.setAttribute("cx", "15");
        body.setAttribute("cy", "12");
        body.setAttribute("rx", "6");
        body.setAttribute("ry", "4");
        body.setAttribute("fill", "#4a5568");
        svg.appendChild(body);

        var head = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        head.setAttribute("cx", "15");
        head.setAttribute("cy", "6");
        head.setAttribute("r", "4");
        head.setAttribute("fill", "#4a5568");
        svg.appendChild(head);

        var beak = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        beak.setAttribute("points", "15,6 20,8 15,10");
        beak.setAttribute("fill", "#f59e0b");
        svg.appendChild(beak);

        var wing1 = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        wing1.setAttribute("cx", "10");
        wing1.setAttribute("cy", "12");
        wing1.setAttribute("rx", "5");
        wing1.setAttribute("ry", "6");
        wing1.setAttribute("fill", "#718096");
        wing1.setAttribute("class", "wing-left");
        svg.appendChild(wing1);

        var wing2 = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        wing2.setAttribute("cx", "20");
        wing2.setAttribute("cy", "12");
        wing2.setAttribute("rx", "5");
        wing2.setAttribute("ry", "6");
        wing2.setAttribute("fill", "#718096");
        wing2.setAttribute("class", "wing-right");
        svg.appendChild(wing2);

        var eye = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        eye.setAttribute("cx", "17");
        eye.setAttribute("cy", "5");
        eye.setAttribute("r", "1");
        eye.setAttribute("fill", "#fff");
        svg.appendChild(eye);

        return svg;
    }

    function createSquirrelSVG() {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 25 20");
        svg.setAttribute("width", "25");
        svg.setAttribute("height", "20");
        svg.setAttribute("class", "creature-squirrel-svg");

        var body = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        body.setAttribute("cx", "12");
        body.setAttribute("cy", "12");
        body.setAttribute("rx", "5");
        body.setAttribute("ry", "4");
        body.setAttribute("fill", "#92400e");
        svg.appendChild(body);

        var head = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        head.setAttribute("cx", "12");
        head.setAttribute("cy", "6");
        head.setAttribute("r", "4");
        head.setAttribute("fill", "#92400e");
        svg.appendChild(head);

        var tail = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        tail.setAttribute("cx", "5");
        tail.setAttribute("cy", "10");
        tail.setAttribute("rx", "4");
        tail.setAttribute("ry", "6");
        tail.setAttribute("fill", "#78350f");
        tail.setAttribute("class", "tail");
        svg.appendChild(tail);

        var eye = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        eye.setAttribute("cx", "13");
        eye.setAttribute("cy", "6");
        eye.setAttribute("r", "1");
        eye.setAttribute("fill", "#000");
        svg.appendChild(eye);

        return svg;
    }

    function createHedgehogSVG() {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 30 20");
        svg.setAttribute("width", "30");
        svg.setAttribute("height", "20");
        svg.setAttribute("class", "creature-hedgehog-svg");

        var body = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        body.setAttribute("cx", "15");
        body.setAttribute("cy", "12");
        body.setAttribute("rx", "8");
        body.setAttribute("ry", "6");
        body.setAttribute("fill", "#6b7280");
        svg.appendChild(body);

        var spikes = document.createElementNS("http://www.w3.org/2000/svg", "g");
        for (var i = 0; i < 6; i++) {
            var spike = document.createElementNS("http://www.w3.org/2000/svg", "line");
            var x = 8 + i * 2.5;
            spike.setAttribute("x1", x);
            spike.setAttribute("y1", "10");
            spike.setAttribute("x2", x);
            spike.setAttribute("y2", "6");
            spike.setAttribute("stroke", "#4b5563");
            spike.setAttribute("stroke-width", "1");
            spike.setAttribute("stroke-linecap", "round");
            spikes.appendChild(spike);
        }
        svg.appendChild(spikes);

        var head = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        head.setAttribute("cx", "15");
        head.setAttribute("cy", "15");
        head.setAttribute("rx", "4");
        head.setAttribute("ry", "3");
        head.setAttribute("fill", "#9ca3af");
        svg.appendChild(head);

        var nose = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        nose.setAttribute("cx", "15");
        nose.setAttribute("cy", "16");
        nose.setAttribute("r", "1");
        nose.setAttribute("fill", "#000");
        svg.appendChild(nose);

        return svg;
    }

    function Bird(treeData, branchIndex) {
        this.element = document.createElement("div");
        this.element.className = "interactive-bird";
        this.element.style.position = "absolute";
        this.element.style.zIndex = "10";
        this.element.appendChild(createBirdSVG());
        this.treeData = treeData;
        this.branchIndex = branchIndex;
        this.state = "flying";
        this.targetX = 0;
        this.targetY = 0;
        this.currentX = -50;
        this.currentY = Math.random() * 30 + 10;
        this.updatePosition();
        bgLayer.appendChild(this.element);

        this.flyToBranch();
    }

    Bird.prototype.updatePosition = function() {
        this.element.style.left = this.treeData.leftPercent + "%";
        this.element.style.transform = "translate(" + this.currentX + "px, " + this.currentY + "px)";
    };

    Bird.prototype.flyToBranch = function() {
        var branch = this.branchIndex === 0 ? this.treeData.branch1Pos : this.treeData.branch2Pos;
        this.targetX = branch.x - 15;
        this.targetY = branch.y - 10;
        this.state = "flying";
        this.animateToTarget(function() {
            this.state = "sitting";
            var self = this;
            setTimeout(function() {
                self.flyAway();
            }, 3000 + Math.random() * 4000);
        }.bind(this));
    };

    Bird.prototype.flyAway = function() {
        this.targetX = window.innerWidth + 50;
        this.targetY = Math.random() * 30 + 10;
        this.state = "flying";
        this.animateToTarget(function() {
            this.currentX = -50;
            this.currentY = Math.random() * 30 + 10;
            this.updatePosition();
            var self = this;
            setTimeout(function() {
                self.flyToBranch();
            }, 2000 + Math.random() * 3000);
        }.bind(this));
    };

    Bird.prototype.animateToTarget = function(callback) {
        var startX = this.currentX;
        var startY = this.currentY;
        var dx = this.targetX - startX;
        var dy = this.targetY - startY;
        var distance = Math.sqrt(dx * dx + dy * dy);
        var duration = Math.max(1000, distance * 10);
        var startTime = Date.now();

        var animate = function() {
            var elapsed = Date.now() - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;

            this.currentX = startX + dx * ease;
            this.currentY = startY + dy * ease;
            this.updatePosition();

            if (this.state === "flying") {
                var wingLeft = this.element.querySelector(".wing-left");
                var wingRight = this.element.querySelector(".wing-right");
                if (wingLeft && wingRight) {
                    var flap = Math.sin(elapsed / 100) * 15;
                    wingLeft.setAttribute("transform", "rotate(" + flap + " 10 12)");
                    wingRight.setAttribute("transform", "rotate(" + (-flap) + " 20 12)");
                }
            }

            if (progress < 1) {
                requestAnimationFrame(animate.bind(this));
            } else if (callback) {
                callback();
            }
        }.bind(this);

        requestAnimationFrame(animate.bind(this));
    };

    function Squirrel(treeData) {
        this.element = document.createElement("div");
        this.element.className = "interactive-squirrel";
        this.element.style.position = "absolute";
        this.element.style.zIndex = "10";
        this.element.appendChild(createSquirrelSVG());
        this.treeData = treeData;
        this.state = "inside";
        this.updatePosition();
        bgLayer.appendChild(this.element);

        this.startBehavior();
    }

    Squirrel.prototype.updatePosition = function() {
        this.element.style.left = this.treeData.leftPercent + "%";
        if (this.state === "inside") {
            this.element.style.transform = "translate(42px, 100px) scale(0.6)";
            this.element.style.opacity = "0";
        } else if (this.state === "peeking") {
            this.element.style.transform = "translate(42px, 95px) scale(0.7)";
            this.element.style.opacity = "1";
        } else if (this.state === "running") {
            this.element.style.transform = "translate(42px, 180px) scale(0.8)";
            this.element.style.opacity = "1";
        }
    };

    Squirrel.prototype.startBehavior = function() {
        var self = this;
        function cycle() {
            self.state = "peeking";
            self.updatePosition();
            setTimeout(function() {
                if (Math.random() > 0.5) {
                    self.state = "running";
                    self.updatePosition();
                    self.runAnimation();
                    setTimeout(function() {
                        self.state = "inside";
                        self.updatePosition();
                        setTimeout(cycle, 2000 + Math.random() * 3000);
                    }, 3000 + Math.random() * 2000);
                } else {
                    self.state = "inside";
                    self.updatePosition();
                    setTimeout(cycle, 2000 + Math.random() * 3000);
                }
            }, 1500 + Math.random() * 2000);
        }
        setTimeout(cycle, 2000);
    };

    Squirrel.prototype.runAnimation = function() {
        var startX = 42;
        var distance = 100;
        var duration = 2000;
        var startTime = Date.now();
        var tail = this.element.querySelector(".tail");

        var animate = function() {
            var elapsed = Date.now() - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var x = startX + distance * progress;
            var bounce = Math.sin(progress * Math.PI * 4) * 3;
            this.element.style.transform = "translate(" + x + "px, " + (180 + bounce) + "px) scale(0.8)";

            if (tail) {
                tail.setAttribute("transform", "rotate(" + (Math.sin(progress * Math.PI * 8) * 10) + " 5 10)");
            }

            if (progress < 1) {
                requestAnimationFrame(animate.bind(this));
            }
        }.bind(this);

        requestAnimationFrame(animate.bind(this));
    };

    function Hedgehog(treeData) {
        this.element = document.createElement("div");
        this.element.className = "interactive-hedgehog";
        this.element.style.position = "absolute";
        this.element.style.zIndex = "5";
        this.element.appendChild(createHedgehogSVG());
        this.treeData = treeData;
        this.state = "hiding";
        this.updatePosition();
        bgLayer.appendChild(this.element);

        this.startBehavior();
    }

    Hedgehog.prototype.updatePosition = function() {
        this.element.style.left = this.treeData.leftPercent + "%";
        if (this.state === "hiding") {
            this.element.style.transform = "translate(35px, 190px) scale(0.6)";
            this.element.style.opacity = "0.3";
        } else if (this.state === "collecting") {
            this.element.style.transform = "translate(35px, 185px) scale(0.7)";
            this.element.style.opacity = "1";
        }
    };

    Hedgehog.prototype.startBehavior = function() {
        var self = this;
        function cycle() {
            self.state = "collecting";
            self.updatePosition();
            self.collectAnimation();
            setTimeout(function() {
                self.state = "hiding";
                self.updatePosition();
                setTimeout(cycle, 4000 + Math.random() * 4000);
            }, 2000 + Math.random() * 2000);
        }
        setTimeout(cycle, 3000);
    };

    Hedgehog.prototype.collectAnimation = function() {
        var startTime = Date.now();
        var duration = 2000;
        var animate = function() {
            var elapsed = Date.now() - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var bounce = Math.sin(progress * Math.PI * 3) * 2;
            var x = 35 + Math.sin(progress * Math.PI * 2) * 10;
            this.element.style.transform = "translate(" + x + "px, " + (185 + bounce) + "px) scale(0.7)";

            if (progress < 1) {
                requestAnimationFrame(animate.bind(this));
            }
        }.bind(this);

        requestAnimationFrame(animate.bind(this));
    };

    window.initCreatures = function() {
        trees = [];
        creatures = [];

        var treePositions = [15, 45, 75];
        treePositions.forEach(function(pos) {
            var treeData = createTreeSVG(pos);
            bgLayer.appendChild(treeData.svg);
            trees.push(treeData);

            var bird = new Bird(treeData, Math.floor(Math.random() * 2));
            creatures.push(bird);

            var squirrel = new Squirrel(treeData);
            creatures.push(squirrel);

            if (Math.random() > 0.5) {
                var hedgehog = new Hedgehog(treeData);
                creatures.push(hedgehog);
            }
        });
    };

    window.clearCreatures = function() {
        trees.forEach(function(tree) {
            if (tree.svg && tree.svg.parentNode) {
                tree.svg.parentNode.removeChild(tree.svg);
            }
        });
        creatures.forEach(function(creature) {
            if (creature.element && creature.element.parentNode) {
                creature.element.parentNode.removeChild(creature.element);
            }
        });
        trees = [];
        creatures = [];
    };
})();
