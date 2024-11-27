import {
  Application,
  Assets,
  Container,
  Graphics,
  Sprite,
  Texture,
} from "pixi.js";
import { Tween, Group }  from "@tweenjs/tween.js";

export default class RouletteAnimator {
  pixiApp: Application | null = null;
  tweenGroup: Group = new Group();
  mainContainer: Container = new Container();

  containerForOutside: Container = new Container();
  containerForMiddle: Container = new Container();
  containerForInside: Container = new Container();

  outsideGraphics: Graphics = new Graphics();
  middleGraphics: Graphics = new Graphics();
  insideGraphics: Graphics = new Graphics();
  
  

  initialization(app: Application) {
    this.pixiApp = app;

    const loop = (time: number) => {      
      this.tweenGroup.update(time);
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    this.pixiApp.stage.addChild(this.mainContainer);
    console.log([`XXX`, 'this.pixiApp.stage', this.pixiApp.renderer]);
    
    this.pixiApp.renderer.view.resize(1000, 1000, 1);

    this.mainContainer.addChild(this.containerForOutside);
    this.mainContainer.addChild(this.containerForMiddle);
    this.mainContainer.addChild(this.containerForInside);

    this.containerForOutside.addChild(this.outsideGraphics);
    this.containerForMiddle.addChild(this.middleGraphics);
    this.containerForInside.addChild(this.insideGraphics);

    this.containerForOutside.pivot.set(500, 500);
    this.containerForOutside.position.set(500, 500);
    this.outsideGraphics.circle(500, 500, 490);
    this.outsideGraphics.fill(0xFF2F4D, 1);
    this.outsideGraphics.stroke({ width: 10, color: 0xfeeb77 });


    this.middleGraphics.circle(500, 500, 350);
    this.middleGraphics.fill(0x00D100, 1);
    this.middleGraphics.stroke({ width: 10, color: 0xfeeb77 });

    this.insideGraphics.circle(500, 500, 210);
    this.insideGraphics.fill(0xFF34FD, 1);
    this.insideGraphics.stroke({ width: 10, color: 0xfeeb77 });

    // drawing bars
    const step = 36;
    //const countOfSteps = 360 / step;

    for (let angle = 0; angle < 360; angle += step) {
      const rad = (angle * Math.PI) / 180;
      const x = Math.sin(rad) * 490 + 490;
      const y = Math.cos(rad) * 490 + 490;

      const x1 = Math.sin(rad) * 450 + 450;
      const y2 = Math.cos(rad) * 450 + 450;

      this.outsideGraphics.moveTo(x, y);
      this.outsideGraphics.lineTo(x1, y2);
      this.outsideGraphics.stroke({ width: 10, color: 0x000000 });
    }
    
    setInterval(() => {
      this.containerForOutside.angle += 1;
    }, 50);
  }

  
}