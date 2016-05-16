<?php
class Typedreamer {
  public static function apply($text, $options = []){
    $breakable = false;
    if (!empty($options)){
      $breakable = isset($options['breakable']) ? $options['breakable'] : false;
    }
    $content = "";
    $words = explode(' ', $text);
    $k = 0;
    foreach($words as $w){
      $word = '<span class="word">';
      $letters = str_split($w);
      foreach ($letters as $e) {
        $character = str_replace(' ', '&nbsp;', $e);
        $cssClass = str_replace(' ', 'space', $e);
        $word .= "<span class=\"letter-$cssClass\">$character</span>";
      }
      $word .= '</span>';

      $content .= $word;
      ++$k;
      if ($k < sizeof($words) - 1){
        $space = '<span class="space">' . ($breakable ? "" : "&nbsp;") . '</span>';
        $content .= $space;
      }
    }
    return $content;
  }
}
