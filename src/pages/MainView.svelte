<main class="min-h-screen max-w-full bg-gray-100 dark:bg-gray-600 flex flex-col items-center">
    <slot name="navbar"/>
    <div class="flex justify-center items-center h-auto flex-grow w-full">
        <slot name="content"/>
    </div>
</main>