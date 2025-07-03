<?php
/**
 * توابع وردپرس برای قالب کارگاه
 * نسخه: 1.0.0
 */

// جلوگیری از دسترسی مستقیم
if (!defined('ABSPATH')) {
    exit;
}

/**
 * تنظیمات اولیه قالب
 */
function cargah_theme_setup() {
    // پشتیبانی از عنوان صفحه
    add_theme_support('title-tag');
    
    // پشتیبانی از تصاویر شاخص
    add_theme_support('post-thumbnails');
    
    // پشتیبانی از HTML5
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
    
    // پشتیبانی از لوگو سفارشی
    add_theme_support('custom-logo', array(
        'height'      => 60,
        'width'       => 120,
        'flex-width'  => true,
        'flex-height' => true,
    ));
    
    // ثبت منوها
    register_nav_menus(array(
        'primary' => 'منوی اصلی',
        'mobile'  => 'منوی موبایل',
        'footer'  => 'منوی فوتر',
    ));
}
add_action('after_setup_theme', 'cargah_theme_setup');

/**
 * بارگیری استایل‌ها و اسکریپت‌ها
 */
function cargah_enqueue_scripts() {
    // استایل‌ها
    wp_enqueue_style('bootstrap-rtl', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css', array(), '5.3.2');
    wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', array(), '6.4.0');
    wp_enqueue_style('vazirmatn-font', 'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700&display=swap', array(), null);
    wp_enqueue_style('cargah-style', get_stylesheet_uri(), array('bootstrap-rtl'), '1.0.0');
    
    // اسکریپت‌ها
    wp_enqueue_script('bootstrap-js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js', array(), '5.3.2', true);
    wp_enqueue_script('cargah-script', get_template_directory_uri() . '/script.js', array('bootstrap-js'), '1.0.0', true);
    
    // متغیرهای AJAX
    wp_localize_script('cargah-script', 'cargah_ajax', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce'    => wp_create_nonce('cargah_nonce'),
    ));
}
add_action('wp_enqueue_scripts', 'cargah_enqueue_scripts');

/**
 * ثبت ناحیه ویجت‌ها
 */
function cargah_widgets_init() {
    register_sidebar(array(
        'name'          => 'فوتر ستون 1',
        'id'            => 'footer-1',
        'description'   => 'ناحیه ویجت برای ستون اول فوتر',
        'before_widget' => '<div class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h6 class="widget-title fw-bold mb-3">',
        'after_title'   => '</h6>',
    ));
    
    register_sidebar(array(
        'name'          => 'فوتر ستون 2',
        'id'            => 'footer-2',
        'description'   => 'ناحیه ویجت برای ستون دوم فوتر',
        'before_widget' => '<div class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h6 class="widget-title fw-bold mb-3">',
        'after_title'   => '</h6>',
    ));
    
    register_sidebar(array(
        'name'          => 'فوتر ستون 3',
        'id'            => 'footer-3',
        'description'   => 'ناحیه ویجت برای ستون سوم فوتر',
        'before_widget' => '<div class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h6 class="widget-title fw-bold mb-3">',
        'after_title'   => '</h6>',
    ));
    
    register_sidebar(array(
        'name'          => 'فوتر ستون 4',
        'id'            => 'footer-4',
        'description'   => 'ناحیه ویجت برای ستون چهارم فوتر',
        'before_widget' => '<div class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h6 class="widget-title fw-bold mb-3">',
        'after_title'   => '</h6>',
    ));
}
add_action('widgets_init', 'cargah_widgets_init');

/**
 * سفارشی‌سازی Customizer
 */
function cargah_customize_register($wp_customize) {
    // بخش تنظیمات سایت
    $wp_customize->add_section('cargah_site_settings', array(
        'title'    => 'تنظیمات کارگاه',
        'priority' => 30,
    ));
    
    // شماره تلفن
    $wp_customize->add_setting('cargah_phone', array(
        'default'           => '021-88776655',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    $wp_customize->add_control('cargah_phone', array(
        'label'   => 'شماره تلفن',
        'section' => 'cargah_site_settings',
        'type'    => 'text',
    ));
    
    // آدرس ایمیل
    $wp_customize->add_setting('cargah_email', array(
        'default'           => 'info@cargah.com',
        'sanitize_callback' => 'sanitize_email',
    ));
    
    $wp_customize->add_control('cargah_email', array(
        'label'   => 'آدرس ایمیل',
        'section' => 'cargah_site_settings',
        'type'    => 'email',
    ));
    
    // آدرس
    $wp_customize->add_setting('cargah_address', array(
        'default'           => 'تهران، خیابان انقلاب، پلاک 123',
        'sanitize_callback' => 'sanitize_textarea_field',
    ));
    
    $wp_customize->add_control('cargah_address', array(
        'label'   => 'آدرس',
        'section' => 'cargah_site_settings',
        'type'    => 'textarea',
    ));
}
add_action('customize_register', 'cargah_customize_register');

/**
 * بهینه‌سازی عملکرد
 */
function cargah_optimize_performance() {
    // حذف نسخه از CSS و JS
    add_filter('style_loader_src', 'cargah_remove_version_strings');
    add_filter('script_loader_src', 'cargah_remove_version_strings');
    
    // غیرفعال کردن emoji
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
}
add_action('init', 'cargah_optimize_performance');

function cargah_remove_version_strings($src) {
    if (strpos($src, 'ver=')) {
        $src = remove_query_arg('ver', $src);
    }
    return $src;
}

/**
 * AJAX handlers
 */
function cargah_ajax_add_to_cart() {
    check_ajax_referer('cargah_nonce', 'nonce');
    
    $product_id = intval($_POST['product_id']);
    $product_name = sanitize_text_field($_POST['product_name']);
    $product_price = floatval($_POST['product_price']);
    
    // اینجا منطق افزودن به سبد خرید
    
    wp_send_json_success(array(
        'message' => 'محصول با موفقیت اضافه شد'
    ));
}
add_action('wp_ajax_cargah_add_to_cart', 'cargah_ajax_add_to_cart');
add_action('wp_ajax_nopriv_cargah_add_to_cart', 'cargah_ajax_add_to_cart');

/**
 * تنظیمات امنیتی
 */
function cargah_security_headers() {
    if (!is_admin()) {
        header('X-Content-Type-Options: nosniff');
        header('X-Frame-Options: SAMEORIGIN');
        header('X-XSS-Protection: 1; mode=block');
    }
}
add_action('send_headers', 'cargah_security_headers');

/**
 * پشتیبانی از WooCommerce
 */
function cargah_woocommerce_support() {
    add_theme_support('woocommerce');
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');
}
add_action('after_setup_theme', 'cargah_woocommerce_support');

/**
 * سفارشی‌سازی admin
 */
function cargah_admin_styles() {
    echo '<style>
        .rtl #wpadminbar .ab-top-menu > li.hover > .ab-item,
        .rtl #wpadminbar.nojq .quicklinks .ab-top-menu > li > .ab-item:focus {
            background: #dc3545;
        }
    </style>';
}
add_action('admin_head', 'cargah_admin_styles');

/**
 * تنظیمات SEO پایه
 */
function cargah_seo_meta() {
    if (is_home() || is_front_page()) {
        echo '<meta name="description" content="فروشگاه تخصصی قطعات خودرو و لوازم تیونینگ کارگاه">' . "\n";
        echo '<meta name="keywords" content="قطعات خودرو، تیونینگ، اگزوز، فیلتر هوا، کارگاه">' . "\n";
    }
}
add_action('wp_head', 'cargah_seo_meta');

?>
