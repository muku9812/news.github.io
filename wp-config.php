<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', '' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'o(MUJmRlNCD29,ZXi-Hs- ?<_ZuPKD&KATY* ]38{VEoDG2$u S9jz?OC4LVRs9U' );
define( 'SECURE_AUTH_KEY',  'c~I18,{Ee{McV JfY]&>0iId3s,0dj$o[D=u}BT<@>ih6k,?T<!v3uS*=M{FJo+S' );
define( 'LOGGED_IN_KEY',    'P.mZ+}yu`]`GBnnCJqH<4QEI4 &Uaqs^{VkP)D1k?y;UZY_lmbD3dN=4 B&[i;_.' );
define( 'NONCE_KEY',        '/[u(g7BFIG,Fzx(}sB TBYNR^4|[D?-!`/E30$Vx+x)-hCYpbt@1Sf]t*.]aii:?' );
define( 'AUTH_SALT',        'a-4jZ=J[TMe(YyC$c6rW|gH,;;v5R@^i&Zng%0#8{BXJ.!}p4V $bw`1&b:G|YJV' );
define( 'SECURE_AUTH_SALT', '_e[|XN~#,Euk?u?Je p}=^lVB5tKk z}<D5EDsPA3&z[<6f8u+h=$vL~su$SMX&[' );
define( 'LOGGED_IN_SALT',   '0,bR;+Vf+}|11pN[B}@PGDK9G)o8sGjZ/Z?,CcEq3`~By@6,U*Lb/BI{@BNNE|=&' );
define( 'NONCE_SALT',       '>VnDHZ.-DD8:iIpvk[#_QLY?bwIR}IWl4Nxv#BqBEydjt-QH|dDi}0mrx}w=SzAu' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
