ARG GIT_USER_NAME
ARG GIT_USER_EMAIL
ARG HTTP_PROXY
FROM node:carbon-alpine

ENV GIT_USER_NAME=${GIT_USER_NAME:-"Ashish Gupta"}
ENV GIT_USER_EMAIL=${GIT_USER_EMAIL:-"gotoashishgupta@gmail.com"}
ENV HTTP_PROXY=${HTTP_PROXY}

# ensure local is preferred over distribution
ENV PATH /usr/local/bin:$PATH
# Generally a good idea to have these, extensions sometimes need them
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8
ENV TERM screen-256color
ENV PYTHONIOENCODING UTF-8

LABEL AUTHOR="${GIT_USER_NAME} <${GIT_USER_EMAIL}>"

RUN set -ex \
  && if [[ ${HTTP_PROXY} ]] && which yarn >/dev/null 2>&1; then \
  echo "Setting Proxy to ${HTTP_PROXY}"; \
  yarn config set proxy ${HTTP_PROXY}; \
  yarn config set https-proxy ${HTTP_PROXY}; \
  yarn config set strict-ssl false ; \
  fi; \
  if which yarn >/dev/null 2>&1; then \
  yarn config set worspace-experimental true ;\
  fi;

ENV PACKAGES="\
  bash \
  build-base \
  cmake \
  ctags \
  curl \
  dumb-init \
  git \
  go \
  linux-headers \
  musl-dev \
  neovim \
  neovim-doc \
  openssh \
  python3 \
  python3-dev \
  tree \
  zsh \
  zsh-vcs \
  "

# Set repos
RUN set -ex \
  && cp /etc/apk/repositories /etc/apk/repositories.bck \
  # replacing default repositories with edge ones
  && echo -e "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories \
  && echo -e "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
  && echo -e "http://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories \
  && echo -e "http://dl-4.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories \
  && echo -e "http://dl-4.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
  && echo -e "http://dl-4.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories \
  && echo

# Install Packages
RUN set -ex \
  && apk add --no-cache ${PACKAGES} \
  && python3 -m ensurepip \
  && pip3 install --upgrade pip setuptools \
  && python3 -m pip install virtualenv \
  && if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip; fi; \
  if [[ ! -e /usr/bin/python ]]; then ln -sf /usr/bin/python3 /usr/bin/python; fi; \
  # neovim is looking for python3 in this dir
  python3 -m virtualenv -p python3 ~/.config/nvim/env \
  && source ~/.config/nvim/env/bin/activate \
  && pip install neovim jedi psutil setproctitle yapf \
  && deactivate \
  # Remove apk cache
  && rm -rf /var/cache/apk/* /tmp/* *.tar.gz ~/.cache /usr/lib/python*/ensurepip \
  # turn back the clock -- so hacky!
  && mv /etc/apk/repositories.bck /etc/apk/repositories

# Set git
RUN set -ex \
  && git config --global user.email ${GIT_USER_EMAIL} \
  && git config --global user.name ${GIT_USER_NAME} 

ENV GOPATH /go
ENV PATH $GOPATH/bin:/usr/local/go/bin:$PATH

RUN mkdir -p "$GOPATH/src" "$GOPATH/bin" && chmod -R 777 "$GOPATH"

# Configure zsh
RUN set -ex \
  && git clone https://github.com/powerline/fonts.git --depth=1 "${HOME}/fonts" \
  && ${HOME}/fonts/install.sh && rm -rf ${HOME}/fonts \
  && git clone https://github.com/tarjoilija/zgen.git "${HOME}/.zgen" \
  && curl --insecure -fLo ~/.zshrc https://raw.githubusercontent.com/devcontainer/ts-dev/master/configs/_zshrc \
  # Set zsh as default
  && sed -i -E "s/\/(b?a)?sh/\/zsh/" /etc/passwd \
  && /bin/zsh -c "source ~/.zshrc" \
  && echo "zsh configured correctly"

ENV SHELL /bin/zsh
# neovim mhartington/nvim-typescript plugin requires neovim and typescript node packages
RUN yarn global add typescript parcel-bundler gulp bower neovim 

# Configure NeoVim
RUN set -ex \
  && mkdir -p ~/.vim/autoload \
  && curl --insecure -fLo ~/.vim/autoload/plug.vim https://raw.githubusercontent.com/devcontainer/ts-dev/master/configs/_plug.vim \
  # vimrc
  && curl --insecure -fLo ~/.vimrc https://raw.githubusercontent.com/devcontainer/ts-dev/master/configs/_vimrc \
  # nvim
  && mkdir -p ~/.config/nvim/autoload \
  && ln -sf ~/.vimrc ~/.config/nvim/init.vim \
  && ln -sf ~/.vim/autoload/plug.vim ~/.config/nvim/autoload/ \
  # Install
  && nvim +PlugInstall +qall
# Install go binaries for nvim separately or the build fails
RUN nvim +'silent :GoInstallBinaries' +qall
RUN nvim +UpdateRemotePlugins +qall

WORKDIR /home/workspace

ENTRYPOINT [ "dumb-init", "--" ]
CMD [ "nvim", "."]