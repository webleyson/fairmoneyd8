


<?php

/**
 * Pre-process variables for html template.
 */
function fairmoney_preprocess_html(&$vars) {
  $viewport = array(
    '#tag' => 'meta', 
    '#attributes' => array(
      'name' => 'viewport', 
      'content' => 'width=device-width',
      //'content' => 'user-scalable=no',
    ),
  );

  drupal_add_html_head($viewport, 'viewport');
}

/**
 * Override or insert variables into the page template.
 */
function fairmoney_preprocess_page(&$vars) {
  $path = current_path();

  if ($path == '/') {
    $vars['page_id'] = 'home';
  } else if ($path == 'loans') {
    $vars['page_id'] = 'loan-search';
  } else if ($path == 'loans2') {
    $vars['page_id'] = 'loan-search';
  } else if ($path == 'loans/smart-search') {
    $vars['page_id'] = 'loan-smart-search';
  } else if ($path == 'loans/apply') {
    $vars['page_id'] = 'loan-apply';
  } else {
    $vars['page_id'] = '';
  }
}

/**
 * Override or insert variables into the node template.
 */
function fairmoney_preprocess_node(&$vars) {
}

function fairmoney_css_alter(&$css) {
  //print_r($css);

  unset($css['misc/ui/jquery.ui.core.css']);
  unset($css['misc/ui/jquery.ui.theme.css']);
  unset($css['modules/overlay/overlay-parent.css']);
  unset($css['sites/all/modules/ctools/css/ctools.css']);
  unset($css['modules/system/system.base.css']);
  unset($css['modules/system/system.menus.css']);
  unset($css['modules/system/system.messages.css']);
  unset($css['modules/system/system.theme.css']);
  unset($css['modules/field/theme/field.css']);
  unset($css['modules/node/node.css']);
  unset($css['modules/user/user.css']);
  unset($css['modules/toolbar/toolbar.css']);
  unset($css['sites/all/modules/views/css/views.css']);
  unset($css['sites/all/modules/ckeditor/css/ckeditor.css']);
}

function fairmoney_js_alter(&$js) {
  //print_r($js);

  $js['sites/all/themes/fairmoney/js/jquery.min.js']['group'] = -100;
  $js['sites/all/themes/fairmoney/js/jquery.min.js']['weight'] = -20;

  $js['sites/all/themes/fairmoney/js/jquery-ui.min.js']['group'] = -100;
  $js['sites/all/themes/fairmoney/js/jquery-ui.min.js']['weight'] = -19;

  unset($js['sites/all/modules/jquery_update/replace/jquery/1.10/jquery.min.js']);
  unset($js['misc/jquery.once.js']);
}

function fairmoney_main_menu($variables) {
  $menu_data = $variables['menu_data'];
  $attributes = $variables['attributes'];
  $menu_id = isset($attributes['id']) ? $attributes['id'] : '';
  $menu_class = isset($attributes['class']) ? $attributes['class'] : '';

  $output = '<a class="nav-menu-btn" href="#menu"><i class="fa fa-bars"></i></a><ul' . ($menu_id != '' ? ' id="' . $menu_id . '"' : '') . ($menu_class != '' ? ' class="' . $menu_class . '"' : '') . '>';

  foreach ($menu_data as $item) {
    if ($item['link']['href'] == '<front>' && drupal_is_front_page()) {
      $item_class = 'active';
    } else if (isset($item['link']['href']) && $item['link']['href'] == $_GET['q']) {
      $item_class = 'active';
    } else {
      $item_class = '';
    }

    $title = $item['link']['title'];
    $href = $item['link']['href'];
    $output .= '<li id="menu-item-' . $item['link']['mlid'] . '"' . ($item_class != '' ? ' class="' . $item_class . '"' : '') . '>' . l($title, $href);

    if (isset($item['below']) && count($item['below']) > 0) {
      $sub_menu_data = $item['below'];

      $output .= '<ul class="level-2">';

      foreach ($sub_menu_data as $sub_item) {
        if ($sub_item['link']['href'] == '<front>' && drupal_is_front_page()) {
          $sub_item_class = 'active';
        } else if (isset($sub_item['link']['href']) && $sub_item['link']['href'] == $_GET['q']) {
          $sub_item_class = 'active';
        } else {
          $sub_item_class = '';
        }

        $sub_title = $sub_item['link']['title'];
        $sub_href = $sub_item['link']['href'];

        $output .= '<li' . ($sub_item_class != '' ? ' class="' . $sub_item_class . '"' : '') . '>' . l($sub_title, $sub_href);

        if (isset($sub_item['below']) && count($sub_item['below']) > 0) {
          $sub_sub_menu_data = $sub_item['below'];

          $output .= '<ul class="level-3">';

          foreach ($sub_sub_menu_data as $sub_sub_item) {
            if ($sub_sub_item['link']['href'] == '<front>' && drupal_is_front_page()) {
              $sub_sub_item_class = 'active';
            } else if (isset($sub_sub_item['link']['href']) && $sub_sub_item['link']['href'] == $_GET['q']) {
              $sub_sub_item_class = 'active';
            } else {
              $sub_sub_item_class = '';
            }

            $sub_sub_title = $sub_sub_item['link']['title'];
            $sub_sub_href = $sub_sub_item['link']['href'];

            $output .= '<li' . ($sub_sub_item_class != '' ? ' class="' . $sub_sub_item_class . '"' : '') . '>' . l($sub_sub_title, $sub_sub_href) . '</li>';
          }

          $output .= '</ul>';
        }

        $output .= '</li>';
      }

      $output .= '</ul>';
    }

    $output .= '</li>';
  }

  $output .= '</ul>';

  return $output;
}

function fairmoney_footer_menu($variables) {
  $links = $variables['links'];
  $attributes = $variables['attributes'];
  $menu_id = isset($attributes['id']) ? $attributes['id'] : '';
  $menu_class = isset($attributes['class']) ? $attributes['class'] : '';

  $output = '<ul' . ($menu_id != '' ? ' id="' . $menu_id . '"' : '') . ($menu_class != '' ? ' class="' . $menu_class . '"' : '') . '>';

  $index = 0;
  foreach ($links as $link) {
    if ($link['href'] == '<front>' && drupal_is_front_page()) {
      $item_class = 'active';
    } else if (isset($link['href']) && $link['href'] == $_GET['q']) {
      $item_class = 'active';
    } else {
      $item_class = '';
    }

    $title = $link['title'];
    $href = $link['href'];

    $output .= '<li' . ($item_class != '' ? ' class="' . $item_class . '"' : '') . '>' . l($title, $href);
    $index++;
  }

  $output .= '</ul>';

  return $output;
}

function fairmoney_menu_local_tasks($variables) {
  $output = '';

  if (!empty($variables['primary'])) {
    $variables['primary']['#prefix'] = '<ul class="primary">';
    $variables['primary']['#suffix'] = '</ul>';
    $output .= drupal_render($variables['primary']);
  }
  if (!empty($variables['secondary'])) {
    $variables['secondary']['#prefix'] = '<ul class="secondary">';
    $variables['secondary']['#suffix'] = '</ul>';
    $output .= drupal_render($variables['secondary']);
  }

  return $output;
}

function fairmoney_menu_local_task($variables) {
  $link = $variables['element']['#link'];
  $link_text = $link['title'];

  if (!empty($variables['element']['#active'])) {
    // Add text to indicate active tab for non-visual users.
    $active = '<span class="element-invisible">' . t('(active tab)') . '</span>';

    // If the link does not contain HTML already, check_plain() it now.
    // After we set 'html'=TRUE the link will not be sanitized by l().
    if (empty($link['localized_options']['html'])) {
      $link['title'] = check_plain($link['title']);
    }
    $link['localized_options']['html'] = TRUE;
    $link_text = t('!local-task-title', array('!local-task-title' => $link['title']));
  }

  return '<li' . (!empty($variables['element']['#active']) ? ' class="active"' : '') . '>' . l($link_text, $link['href'], $link['localized_options']) . "</li>\n";
}

function fairmoney_pager($variables) {
  $tags = $variables['tags'];
  $element = $variables['element'];
  $parameters = $variables['parameters'];
  $quantity = $variables['quantity'];
  global $pager_page_array, $pager_total;

  // Calculate various markers within this pager piece:
  // Middle is used to "center" pages around the current page.
  $pager_middle = ceil($quantity / 2);
  // current is the page we are currently paged to
  $pager_current = $pager_page_array[$element] + 1;
  // first is the first page listed by this pager piece (re quantity)
  $pager_first = $pager_current - $pager_middle + 1;
  // last is the last page listed by this pager piece (re quantity)
  $pager_last = $pager_current + $quantity - $pager_middle;
  // max is the maximum page number
  $pager_max = $pager_total[$element];
  // End of marker calculations.

  // Prepare for generation loop.
  $i = $pager_first;
  if ($pager_last > $pager_max) {
    // Adjust "center" if at end of query.
    $i = $i + ($pager_max - $pager_last);
    $pager_last = $pager_max;
  }
  if ($i <= 0) {
    // Adjust "center" if at start of query.
    $pager_last = $pager_last + (1 - $i);
    $i = 1;
  }
  // End of generation loop preparation.

  $li_first = theme('pager_first', array('text' => (isset($tags[0]) ? $tags[0] : t('« first')), 'element' => $element, 'parameters' => $parameters));
  $li_previous = theme('pager_previous', array('text' => (isset($tags[1]) ? $tags[1] : t('‹ previous')), 'element' => $element, 'interval' => 1, 'parameters' => $parameters));
  $li_next = theme('pager_next', array('text' => (isset($tags[3]) ? $tags[3] : t('next ›')), 'element' => $element, 'interval' => 1, 'parameters' => $parameters));
  $li_last = theme('pager_last', array('text' => (isset($tags[4]) ? $tags[4] : t('last »')), 'element' => $element, 'parameters' => $parameters));

  if ($pager_total[$element] > 1) {
    if ($li_first) {
      $items[] = array(
        'class' => array('pager-first'),
        'data' => $li_first,
      );
    }
    if ($li_previous) {
      $items[] = array(
        'class' => array('pager-previous'),
        'data' => $li_previous,
      );
    }

    // When there is more than one page, create the pager list.
    if ($i != $pager_max) {
      if ($i > 1) {
        $items[] = array(
          'class' => array('pager-ellipsis'),
          'data' => '…',
        );
      }
      // Now generate the actual pager piece.
      for (; $i <= $pager_last && $i <= $pager_max; $i++) {
        if ($i < $pager_current) {
          $items[] = array(
            'class' => array('pager-item'),
            'data' => theme('pager_previous', array('text' => $i, 'element' => $element, 'interval' => ($pager_current - $i), 'parameters' => $parameters)),
          );
        }
        if ($i == $pager_current) {
          $items[] = array(
            'class' => array('pager-current'),
            'data' => $i,
          );
        }
        if ($i > $pager_current) {
          $items[] = array(
            'class' => array('pager-item'),
            'data' => theme('pager_next', array('text' => $i, 'element' => $element, 'interval' => ($i - $pager_current), 'parameters' => $parameters)),
          );
        }
      }
      if ($i < $pager_max) {
        $items[] = array(
          'class' => array('pager-ellipsis'),
          'data' => '…',
        );
      }
    }
    // End generation.
    if ($li_next) {
      $items[] = array(
        'class' => array('pager-next'),
        'data' => $li_next,
      );
    }
    if ($li_last) {
      $items[] = array(
        'class' => array('pager-last'),
        'data' => $li_last,
      );
    }
    return theme('item_list', array(
      'items' => $items,
      'attributes' => array('class' => array('pager')),
    ));
  }
}