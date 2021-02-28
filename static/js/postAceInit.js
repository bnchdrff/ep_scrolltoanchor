exports.postAceInit = function (hook, context) {
  var anchor = getUrlVars()["anchor"];
  if (anchor) {
    findAnchorAndScrollTo('#' + anchor.trim());
  }
};

function findAnchorAndScrollTo(anchor) {
  var $outer = $('iframe[name="ace_outer"]').contents();

  var lines = $outer.find("iframe").contents().find("#innerdocbody").contents();

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (line.textContent.trim().startsWith(anchor)) {
      var newY = line.offsetTop;
      var $outerdoc = $outer.find("#outerdocbody");

      $outerdoc.animate({ scrollTop: newY });
      if (browser.mozilla || browser.firefox)
        $outerdoc.parent().animate({ scrollTop: newY }); // needed for FF
      break;
    }
  }
}

function getUrlVars() {
  var vars = [],
    hash;
  var hashes = window.location.href
    .slice(window.location.href.indexOf("?") + 1)
    .split("&");
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split("=");
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  var hashes = window.location.href
    .slice(window.location.href.indexOf("#") + 1)
    .split("&");
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split("=");
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}
