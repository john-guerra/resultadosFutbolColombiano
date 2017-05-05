/* global require */
var scraperjs = require("scraperjs");
var fs = require("fs");

var url = "https://es.wikipedia.org/wiki/Torneo_Apertura_2017_(Colombia)#Resultados";


scraperjs.StaticScraper.create(url)
  .scrape(function($) {
    return $("#mw-content-text > center:nth-child(n+32):nth-child(-n+51)").map(function() {
      var games = [];
      var round = $(this).find("table tr:nth-child(1)").text().trim().split(" ")[1];
      // var prevDate = null;

      $(this).find("table tr:nth-child(n+3)").each(function () {
        var game = {};
        game.teams = [
          $(this).find("td:nth-child(1)").text().replace(".", ""),
          $(this).find("td:nth-child(3)").text().replace(".", "")
        ];
        game.score =$(this).find("td:nth-child(2)").text().split(":");
        game.round = round;
        game.stadium = $(this).find("td:nth-child(4)").text().trim();
        game.date = $(this).find("td:nth-child(5)").text();
        games.push(game);
      });
      return games;
    }).get();
  })
  .then(function(results) {
    var json = JSON.stringify(results);
    fs.writeFileSync(__dirname+"/torneoAperturaColombia2017.json", json);
  });