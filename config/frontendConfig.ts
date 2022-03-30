import EmailPasswordReact from 'supertokens-auth-react/recipe/emailpassword'
import SessionReact from 'supertokens-auth-react/recipe/session'

import { appInfo } from './appInfo'

export const frontendConfig = () => {
  return {
    languageTranslations: {
      translations: {
        pt: {
          EMAIL_PASSWORD_SIGN_IN_HEADER_TITLE: 'Entrar',
          EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_START: '',
          EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_SIGN_UP_LINK: 'Cadastre-se',
          EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_END: '',
          EMAIL_PASSWORD_EMAIL_LABEL: 'Email',
          EMAIL_PASSWORD_EMAIL_PLACEHOLDER: 'Digite seu email',
          EMAIL_PASSWORD_PASSWORD_LABEL: 'Senha',
          EMAIL_PASSWORD_PASSWORD_PLACEHOLDER: 'Digite sua senha',
          EMAIL_PASSWORD_SIGN_IN_SUBMIT_BTN: 'Entrar',
          EMAIL_PASSWORD_SIGN_IN_FOOTER_FORGOT_PW_LINK: '',
          BRANDING_POWERED_BY_START: '',
          BRANDING_POWERED_BY_END: '',
          ERROR_NON_OPTIONAL: 'O campo é obrigatório',
          ERROR_EMAIL_INVALID: 'Email inválido'
        }
      },
      defaultLanguage: 'pt'
    },
    appInfo,
    recipeList: [
      EmailPasswordReact.init({
        style: {
          container: {
            fontFamily: 'inherit'
          },
          superTokensBranding: {
            display: 'none'
          },
          secondaryText: {
            display: 'none'
          },
          button: {
            background: '#005e67',
            border: 'none'
          },
          inputWrapper: {
            border: 'none',
            boxShadow: 'none',
            background: 'transparent'
          },
          inputError: {
            border: 'none',
            boxShadow: 'none'
          },
          inputAdornment: {
            display: 'none',
            border: 'none',
            boxShadow: 'none',
            background: 'transparent'
          },
          input: {
            border: '2px solid #005e67',
            borderRadius: '0px',
            padding: '0.5rem',
            fontSize: '16px',
            boxShadow: 'none !important',
            letterSpacing: 'none',
            height: 'auto',

            '&:focus': {
              border: '2px solid #005e67',
              outline: 'none',
              borderRadius: '0px',
              boxShadow: 'none'
            }
          }
        }
      }),
      SessionReact.init()
    ]
  }
}
