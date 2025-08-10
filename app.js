$(function() {
  let currentUserId = 1;
  const maxUserId = 30;

  // 유저 데이터 불러오기
  function loadUser(id) {
    $.ajax({
      url: `https://dummyjson.com/users/${id}`,
      method: 'GET',
      success: function(user) {
        $('.info__image img').attr('src', user.image);
        $('.info__content').html(`
          <h2>${user.firstName} ${user.lastName}</h2>
          <p>Email: ${user.email}</p>
          <p>Age: ${user.age}</p>
        `);
        loadPosts(id);
        loadTodos(id);
      }
    });
  }

  // Posts 불러오기
  function loadPosts(id) {
    $.ajax({
      url: `https://dummyjson.com/users/${id}/posts`,
      method: 'GET',
      success: function(data) {
        $('.posts h3').text('Posts');
        const $ul = $('.posts ul').empty();
        data.posts.forEach(post => {
          $ul.append(`<li data-id="${post.id}" class="post-title">${post.title}</li>`);
        });
        $('.posts ul').hide(); // 처음엔 숨김
      }
    });
  }

  // Todos 불러오기 (체크 제거)
  function loadTodos(id) {
    $.ajax({
      url: `https://dummyjson.com/users/${id}/todos`,
      method: 'GET',
      success: function(data) {
        $('.todos h3').text('To Dos');
        const $ul = $('.todos ul').empty();
        data.todos.forEach(todo => {
          $ul.append(`<li>${todo.todo}</li>`);
        });
        $('.todos ul').hide();
      }
    });
  }

  // Prev 버튼
  $('header button:first').on('click', function() {
    currentUserId = currentUserId === 1 ? maxUserId : currentUserId - 1;
    loadUser(currentUserId);
  });

  // Next 버튼
  $('header button:last').on('click', function() {
    currentUserId = currentUserId === maxUserId ? 1 : currentUserId + 1;
    loadUser(currentUserId);
  });

  // Posts 제목 클릭 시 목록 슬라이드 토글
  $('.posts h3').on('click', function() {
    $('.posts ul').slideToggle();
  });

  // Todos 제목 클릭 시 목록 슬라이드 토글
  $('.todos h3').on('click', function() {
    $('.todos ul').slideToggle();
  });

  // Post 목록 제목 클릭 시 alert
  $(document).on('click', '.post-title', function() {
    const postId = $(this).data('id');
    $.ajax({
      url: `https://dummyjson.com/posts/${postId}`,
      method: 'GET',
      success: function(post) {
        alert(`Title: ${post.title}\n\n${post.body}\n\nViews: ${post.views}`);
      }
    });
  });

  // 첫 유저 로드
  loadUser(currentUserId);
});
