const _logList = [
  {
    title: 'UI library 개발',
    date: '2018.9.',
    content: `거래소 페이지에서 사용하는 Component를 library로 관리하기 위해 Storybook으로 프로젝트를 진행했다.`,
    tags: ['React', 'RxJS', 'Storybook', 'Styled-components', 'Webpack'],
  },
  {
    title: '거래소 React-Native Prototype',
    date: '2018.10.',
    content: 'React-Native로 거래소 앱 개발 가능여부를 확인할 목적으로 Prototype을 만들었다. 코인 리스트(이름, 가격, 거래대금, 전일대비 가격비), 매수/매도 기능, 거래내역 확인, 최근체결내역 확인 등의 거래소 주요 기능을 넣어서 개발했다.',
    tags: ['React-Native', 'Redux', 'RxJS', 'Redux-Observable'],
  },
  {
    title: '거래소 비지니스 로직 모듈화',
    date: '2018.12.',
    content: `React-Native 프로젝트 및 해외 거래소 오픈을 위해 거래소 Business logic의 모듈화 작업을 진행했다. 모듈화 방향은 'View와 Business logic을 분리한다' 였다. 그 이유는 첫째, React-Native에서는 web에서 사용하는 react-router, window, toast 등을 사용할 수 없고, 둘째, 모듈을 사용하게 될 해외 거래소 프론트엔드 개발자에게 View에 dependency있는 모듈을 전달하고 싶지 않았다. 즉, router의 이동이나 toast를 띄우는 것은 React-Native 프로젝트, 해외 거래소 프로젝트 내에서 처리하고 싶었다. 따라서, Business logic은 모두 모듈 내에서 처리되면서 이와 동시에 병렬적으로 View에 종속된 처리들이 React-Native 또는 해외 거래소 프로젝트에서 일어나는 구조를 구성했다. 이를 위해 epic에서 '로그인, 인증, 거래내역, 매수, 매도 등'을 남기고 'router 이동, window 사용, toast 처리 등'을 제거했다. 또, Component에서 Redux action(모든 Business logic은 Redux action으로 처리됨)을 감지해서 별도로 View에 필요한 로직을 실행시킬 수 있도록 Redux middleware, HOC(Redux action listener)를 활용했다. 모듈은 npm install 하여 사용할 수 있도록 별도 package로 관리했고, 개발 속도를 향상시키기 위해 Lerna monorepo를 사용했다.`,
    tags: ['React', 'Redux', 'RxJS', 'Redux-Observable', 'Lerna'],
  },
];

const devlog = (function(){
  let _container;

  function _render() {
    const renderItems = _logList.reduce((pv, cv, idx) => {
      return {
        content: pv.content.concat(`
          <div class="wrapper ${(idx % 2 === 0 ? 'left' : 'right')}">
            <div class="content">
              <h5>${cv.title}</h5>
              <span class="text-muted">${cv.date}</span>
              <p class="mt-2 mb-2">
                ${
                  cv.content.length < 100 ? cv.content : `
                  <div id="display-${idx}">
                    ${cv.content.slice(0, 100)}...
                    <button class="btn badge badge-pill badge-secondary" style="font-size: 12px; vertical-align: text-bottom;" data-toggle="collapse" data-target="#collapse-${idx}" onClick="document.getElementById('display-${idx}').style.display = 'none'">more</button>
                  </div>
                  <div id="collapse-${idx}" class="collapse">
                    ${cv.content}
                  </div>`
                }
              </p>
              <div>${cv.tags.reduce((pv, cv) => pv + `<span class="badge badge-info mr-2">${cv}</span>`, '')}</div>
            </div>
          </div>
        `)
      }
    }, { content: '' })

    _container.innerHTML = `
      <div class="timeline">
        ${renderItems.content}
      </div>
    `;
  }

  function init(el) {
    _container = el;
    _render();
  }

  return {
    init,
  }
})();