'use strict'

import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'

// loads the Icon plugin
UIkit.use(Icons)

/**
 *
 * @param $value
 * @returns {*}
 */
const formatMoney = function formatMoney($val) {
  if ($val.search(/[a-zа-яё]/i) < 0) {
    $val = $val.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1\u202F')
    $val = $val.replace('.', ',')
  }

  return $val
}