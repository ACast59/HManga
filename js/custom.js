var HOME = "https://www.hmanga.asia/";
var URL_ACTUAL = window.location.href;
var page_post = URL_ACTUAL.indexOf(".html") != -1;
var N_POSTS = 499;
var cantPOSTS = 50;
var done_once = false;
var pages = [];
var current_page = 0;
var last_visited;
var done_multi = false;
console.log = console.debug = console.warn = console.info = alert = function() {};
$(document).ready(function() {
  main();
  if (typeof(lnk) == "undefined") {
    $("#hm-download").remove()
  }
  $("#hm-download").click(function() {
    var b = window.open("https://cut-urls.com/st?api=1af93ae3896701cd6c5a9bed60e5a58c2aa5fa8e&url=" + encodeURIComponent(lnk))
  });
  $("#hm-multipages").click(function() {
    if (!done_multi) {
      $(this).html('<div class="fa fa-eye"/>');
      window.location = "#all";
      done_multi = true
    } else {
      $(this).html('<span class="fa fa-eye"/>');
      window.location = "#" + last_visited;
      done_multi = false
    }
  });
});

$(window).hashchange(function() {
  main()
});

function preload(a) {
  $("<img/>").attr("src", pages[a])
}

function changePage(a) {
  a = parseInt(a) - 1;
  val = parseInt(a);
  last_visited = a + 1;
  if (a < pages.length) {
    $("#display-img").attr("src", pages[a]);
    if (current_page == "") {
      $("#hm-post-body a").attr("href", "#2");
    } else {
      if ((a + 1) != pages.length) {
        $("#hm-post-body a").attr("href", "#" + (a + 2));
      }
    }
    $('#hm-page-list').val("#" + (val + 1));
  }
  preload(a + 1);
  $("html, body").stop();
  $("html, body").animate({
    scrollTop: 0
  }, "400")
}

function do_once() {
  if (!done_once) {
    var e = parseInt(current_page);
    for (var c = 1; c < pages.length + 1; c++) {
      $("#hm-page-list").append('<option id="option-' + c + '" value="#' + c + '">' + c + "</option>")
    }
    var h = document,
    k = h.createElement("script");
  }
  done_once = true
}

$(document).ready(function() {
  $('#hm-page-list').on('change', function () {
    var url = $(this).val();
    if (url) {
      window.location = url;
    }
    return false;
  });
  
  $("#hm-chapter-page__prev").click(function() {
    var a = parseInt(current_page);
    if ((a > 1)) {
      window.location = "#" + (a - 1)
    }
  });
  
  $("#hm-chapter-page__next").click(function() {
    var a = parseInt(current_page);
    if (a < pages.length) {
      window.location = "#" + (a + 1);
    } else {
      if (current_page == "") {
        window.location = "#2"
      }
    }
  });
  
  $("body").keydown(function(b) {
    var a = parseInt(current_page);
    if (b.keyCode == 39) {
      if (a < pages.length) {
        window.location = "#" + (a + 1)
      } else {
        if (current_page == "") {
          window.location = "#2"
        }
      }
    }
    if ((a > 1) && (b.keyCode == 37)) {
      window.location = "#" + (a - 1)
    }
  });
});

function main() {
  for (i = 0; i < pages.length; i++) {
    pages[i] = pages[i].replace("http://", "https://")
  }
  if (page_post) {
    do_once();
    current_page = location.hash.replace(/^#/, "") || "";
    if (current_page == "all") {
      $("#hm-post-body").empty();
      $(pages).each(function(d) {
        $("#hm-post-body").append('<div id="' + d + '" data-appear-top-offset="600"/>')
      });
      $("#hm-post-body > div:first-of-type").append('<img src="' + pages[0] + '">');
      $("#hm-post-body div").appear();
      $("#hm-post-body div").on("appear", function(d, e) {
        e.each(function() {
          $(this).empty().append('<img class="img-fluid" src="' + pages[$(this).attr("id")] + '">').find("img").load(function() {
            $(this).parent().css("height", $(this).height())
          })
        })
      });
      $("#hm-post-body div").on("disappear", function(d, e) {
        e.each(function() {
          $(this).empty()
        })
      })
    } else {
      if (current_page == "") {
        $("#hm-post-body").empty();
        $("#hm-post-body").append('<a><img class="img-fluid" id="display-img"/></a>');
        changePage(1)
      } else {
        $("#hm-post-body").empty();
        $("#hm-post-body").append('<a><img class="img-fluid" id="display-img"/></a>');
        changePage(current_page)
      }
    }
  }
}

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
                        $("#hm-related-mangas").append('<div class="col-6 col-sm-4 col-lg-2 px-2"><div class="card bg-dark mb-3"><a href="'+rdp_posturl+'" title="'+rdp_posttitle+'"><img class="card-img-top" src="'+rdp_thumb+'" width="124" height="180" alt="'+rdp_posttitle+'" /></a><div class="card-body py-3"><a class="text-white" href="'+rdp_posturl+'" title="'+rdp_posttitle+'"><h5 class="card-title text-truncate m-0">'+rdp_posttitle+'</h5></a></div></div></div>');
                      }
                    };
                    getvalue();

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
