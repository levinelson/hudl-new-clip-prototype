(function() {

  var video = $('#video').get(0);
  var trimStart = 0;
  var trimEnd = 0;

  var isTrimming = false;
  var videoIsTrimmed = false;

  // Loop video after trim
  video.addEventListener('timeupdate', function() {
    if (videoIsTrimmed) {
      if (video.currentTime >= trimEnd) {
        video.currentTime = trimStart;
        video.play();
      }
      // loop playhead through
      function playheadAnimation() {
        $('.playhead').velocity({
          right: ['0%', '100%'],
        }, {
          easing: 'linear',
          duration: (trimEnd - trimStart) * 1000,
          complete: playheadAnimation
        })
      }
      playheadAnimation();
    }
  }, false);

  $('#new-clip-button').click(function(){

    // Finish Trimming
    if (isTrimming) {

      trimEnd = video.currentTime;
      isTrimming = false;

      $('.trimmer').velocity('stop');

      $('.button-container').hide();

      // start playing video from start
      video.currentTime = trimStart;
      videoIsTrimmed = true;

      $('.new-clip').velocity({
        scale: [1, .5],
        opacity: 1
      }, {
        display: 'block',
        duration: 500,
        easing: [300, 20],
        complete: function() {
          $('#clip-title').focus()
        }
      })

      $(this).velocity({
        rotateX: '0deg',
      });

    // Start Trimming
    } else {

      isTrimming = true;
      trimStart = video.currentTime - 3; // offset
      video.currentTime = trimStart;

      $(this).velocity({
        rotateX: '180deg',
      });

      $('.trimmer-wrap').velocity({
        opacity: 1,
      })

      $('.trimmer').velocity({
        width: '90%',
      }, {
        easing: 'linear',
        duration: 7000
      })

    }
  })

  var saveClip = function() {
    videoIsTrimmed = false;

    $('.trimmer-wrap').velocity({
      opacity: 0,
    })

    $('.new-clip').velocity({
      scale: [.5, 1],
      opacity: 0
    }, {
      display: 'none',
      duration: 500,
      easing: [300, 20],
      complete: function() {
        $('.button-container').velocity({
          opacity: 1
        }, {
          duration: 250,
          display: 'flex',
        });
      }
    })
  }

  $(document).keypress(function(e) {
    if(e.which == 13) {
      saveClip();
    }
  });

  $('#save-clip').click(function(){
    saveClip();
  });

})();
