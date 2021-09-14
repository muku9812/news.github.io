<?php
if (!function_exists('newsget_header_section')) :
/**
 *  Slider
 *
 * @since Newsget
 *
 */
function newsget_header_section()
{
?>
<div class="container-fluid">
    <div class="mg-nav-widget-area">
        <div class="row align-items-center justify-content-center">
            <div class="col-md-4 col-sm-4 text-center-xs">
                <div class="navbar-header">
                      <?php the_custom_logo(); 
                      if (display_header_text()) : ?>
                    <div class="site-branding-text">
                        <h1 class="site-title"> <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo('name'); ?></a></h1>
                        <p class="site-description"><?php bloginfo('description'); ?></p>
                    </div>
                  <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
</div>
<?php 
}
endif;
add_action('newsget_action_header_section', 'newsget_header_section', 5);