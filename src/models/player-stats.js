class PlayerStats {
  constructor(name, pts, fgm, fga, threes, ftm, fta, reb, ast, tov, stl, blk) {
    this.statsName = name;
    this.perGame = false;
    this.gp = 0;
    this.pts = pts;
    this.fgm = fgm;
    this.fga = fga;
    this.threes = threes;
    this.ftm = ftm;
    this.fta = fta;
    this.reb = reb;
    this.ast = ast;
    this.tov = tov;
    this.stl = stl;
    this.blk = blk;
  }
}
