<?php
/**
 * The template for displaying the content.
 * @package News Get
 */
?>
<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                            <!-- mg-posts-sec mg-posts-modul-6 -->
                     <div class="row">
                        <?php while(have_posts()){ the_post(); ?>
                            <div class="col-md-12 pulse animated">
                                    <div class="mg-blog-post-box"> 
                                            
                                        <?php if(has_post_thumbnail()) { ?>
                                        <div class="mg-blog-thumb">
                                            
                                            <?php echo '<a href="'.esc_url(get_the_permalink()).'">';
                                            the_post_thumbnail( '', array( 'class'=>'img-responsive' ) );
                                            echo '</a>'; ?>
                                        </div>
                                         <?php } ?>    
                                     <article class="small">
                                            <div class="mg-sec-top-post py-3 col">
                                                    <div class="mg-blog-category"> 
                                                        <?php newsup_post_categories(); ?>
                                                    </div>

                                                    <h4 class="entry-title title"><a href="<?php the_permalink();?>"><?php the_title();?></a></h4>
                                                    <?php newsup_post_meta(); ?>

                                                
                                                    <div class="mg-content">
                                                        <p><?php echo wp_trim_words( get_the_excerpt(), 20 ); ?></p>
                                                </div>
                                            </div>
                                    </article>
                                    </div>
                                <!-- // mg-posts-sec-inner -->
                            </div>
                            <!-- // mg-posts-sec block_6 -->
                        
                                     <?php } ?>
                                    <div class="col-md-12 text-center d-md-flex justify-content-center">
                                        <?php //Previous / next page navigation
                                        the_posts_pagination( array(
                                        'prev_text'          => '<i class="fa fa-angle-left"></i>',
                                        'next_text'          => '<i class="fa fa-angle-right"></i>',
                                        ) ); ?>
                                    </div>
                                
                            <!--col-md-12-->
                        </div>
                </div>