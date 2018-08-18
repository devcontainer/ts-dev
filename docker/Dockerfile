ARG GIT_USER_NAME=${GIT_USER_NAME}
ARG GIT_USER_EMAIL=${GIT_USER_EMAIL}
FROM node:boron-alpine

ENV GIT_USER_NAME=${GIT_USER_NAME:-"Ashish Gupta"}
ENV GIT_USER_EMAIL=${GIT_USER_EMAIL:-"gotoashishgupta@gmail.com"}

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
  ctags \
  curl \
  git \
  bash \
  neovim \
  dumb-init \
  tree \
  zsh-vcs \
  zsh \
  python3 \
  python3-dev \
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
  && rm -r /usr/lib/python*/ensurepip  \
  && pip3 install --upgrade pip setuptools \
  && if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip; fi; \
  if [[ ! -e /usr/bin/python ]]; then ln -sf /usr/bin/python3 /usr/bin/python; fi; \
  # Remove apk cache
  rm -rf /var/cache/apk/* /tmp/* *.tar.gz ~/.cache \
  # turn back the clock -- so hacky!
  && mv /etc/apk/repositories.bck /etc/apk/repositories \
  && echo

# Set git
RUN set -ex \
  && git config --global user.email ${GIT_USER_EMAIL} \
  && git config --global user.name ${GIT_USER_NAME} 

# Configure zsh
RUN set -ex \
  && git clone https://github.com/powerline/fonts.git --depth=1 "${HOME}/fonts" \
  && ${HOME}/fonts/install.sh && rm -rf ${HOME}/fonts \
  && git clone https://github.com/tarjoilija/zgen.git "${HOME}/.zgen" \
  && curl --insecure -fLo ~/.zshrc https://raw.githubusercontent.com/devcontainer/ts-dev/master/configs/_zshrc \
  # Set zsh as default
  && sed -i -E "s/\/(b?a)?sh/\/zsh/" /etc/passwd \
  && /bin/zsh -c "source ~/.zshrc" \
  && echo "zsh configured correctly";

ENTRYPOINT [ "dumb-init", "--" ]
CMD [ "vi" ]




