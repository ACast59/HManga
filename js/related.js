var rdp_numposts = 6;
var rdp_current = [];
var rdp_total_posts = 0;
var rdp_current = new Array(rdp_numposts);

function totalposts(json) {
  rdp_total_posts = json.feed.openSearch$totalResults.$t
}

$("#hm-related-mangas").after('<script type=\"text/javascript\" src=\"/feeds/posts/default?alt=json-in-script&max-results=0&callback=totalposts\"><\/script>');

function getvalue() {
  for (var i = 0; i < rdp_numposts; i++) {
    var found = false;
    var rndValue = get_random();
    
    for (var j = 0;j < rdp_current.length;j++) {
      if (rdp_current[j] == rndValue) {
        found = true;break
      }
    };
    
    if (found) {
      i--
    } else {
      rdp_current[i] = rndValue
    }
  }
};

function get_random() {
  var ranNum = 1+Math.round(Math.random()*(rdp_total_posts-1));
  return ranNum
};

function random_posts(json) {
  for (var i = 0; i < rdp_numposts; i++) {
    var entry = json.feed.entry[i];
    var rdp_posttitle = entry.title.$t;
    
    for (var j = 0; j < entry.link.length; j++) {          
      if (entry.link[j].rel == 'alternate') {
        var rdp_posturl = entry.link[j].href;
        
        if ('media$thumbnail' in entry) {
          var rdp_thumb = entry.media$thumbnail.url.replace("/s72-c/", "/s180/")
        } else {
          rdp_thumb = "http://3.bp.blogspot.com/-5SoVe1K6JSk/Utl0OOmucAI/AAAAAAAAF6E/hQghgD_EJdQ/s1600/no_thumb.png"
        }
      }
    };
    $("#hm-related-mangas").append('<div class="col-6 col-sm-4 col-lg-2 px-2"><div class="card bg-dark mb-3"><a href="'+rdp_posturl+'" title="'+rdp_posttitle+'"><img class="card-img-top" src="'+rdp_thumb+'" width="125" height="180"  alt="'+rdp_posttitle+'" /></a><div class="card-body py-3"><a class="text-white" href="'+rdp_posturl+'" title="'+rdp_posttitle+'"><h5 class="card-title text-truncate m-0">'+rdp_posttitle+'</h5></a></div></div></div>');
  }
};
getvalue();

for (var i = 0; i < rdp_numposts; i++) {
  var rdp_script_output = document.createElement("script");
  rdp_script_output.async = true;
  rdp_script_output.src = '/feeds/posts/default?alt=json-in-script&start-index='+rdp_current[i]+'&max-results=1&callback=random_posts';
  var s0 = document.getElementsByTagName('script')[0];
  s0.parentNode.insertBefore(rdp_script_output, s0);
};
