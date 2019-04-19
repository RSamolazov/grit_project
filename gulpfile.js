var gulp = require("gulp"),
    pug = require('gulp-pug'),
    browserSync = require('browser-sync'), // Подключаем Browser Sync
    sass = require("gulp-sass"); // переводит SASS в CSS
const concat = require('gulp-concat');

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('sass', function(){
    return gulp.src('app/pages/**/*.sass') // Берем все sass файлы из папки sass и дочерних, если таковые будут
        .pipe(sass())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('app'))
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
    }
);

gulp.task('pug', function(){
    return gulp.src('app/pages/*.pug')
        .pipe(pug({pretty:true}))
        .pipe(concat('index.html'))
        .pipe(gulp.dest('app'))
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
    }
);  

gulp.task('watch', function() {
    gulp.watch('app/pages/**/*.sass', gulp.parallel('sass')),
    gulp.watch('app/pages/**/*.pug', gulp.parallel('pug'));
    }
);
gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch'));


