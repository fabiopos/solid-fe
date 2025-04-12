'use client'

const values = [
    {
        name: 'Be world-class',
        description:
            'Aut illo quae. Ut et harum ea animi natus. Culpa maiores et sed sint et magnam exercitationem quia. Ullam voluptas nihil vitae dicta molestiae et. Aliquid velit porro vero.',
    },
    {
        name: 'Share everything you know',
        description:
            'Mollitia delectus a omnis. Quae velit aliquid. Qui nulla maxime adipisci illo id molestiae. Cumque cum ut minus rerum architecto magnam consequatur. Quia quaerat minima.',
    },
    {
        name: 'Always learning',
        description:
            'Aut repellendus et officiis dolor possimus. Deserunt velit quasi sunt fuga error labore quia ipsum. Commodi autem voluptatem nam. Quos voluptatem totam.',
    },
    {
        name: 'Be supportive',
        description:
            'Magnam provident veritatis odit. Vitae eligendi repellat non. Eum fugit impedit veritatis ducimus. Non qui aspernatur laudantium modi. Praesentium rerum error deserunt harum.',
    },
    {
        name: 'Take responsibility',
        description:
            'Sit minus expedita quam in ullam molestiae dignissimos in harum. Tenetur dolorem iure. Non nesciunt dolorem veniam necessitatibus laboriosam voluptas perspiciatis error.',
    },
    {
        name: 'Enjoy downtime',
        description:
            'Ipsa in earum deserunt aut. Quos minus aut animi et soluta. Ipsum dicta ut quia eius. Possimus reprehenderit iste aspernatur ut est velit consequatur distinctio.',
    },
]

export default function AboutValues() {
    return (
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-pretty text-4xl font-semibold tracking-tight text-cyan-300 sm:text-5xl">Our
                    values</h2>
                <p className="mt-6 text-lg/8 text-gray-300">
                    Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate
                    veritatis in
                    accusamus quisquam.
                </p>
            </div>
            <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base/7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {values.map((value) => (
                    <div key={value.name}>
                        <dt className="font-semibold text-cyan-300">{value.name}</dt>
                        <dd className="mt-1 text-gray-300">{value.description}</dd>
                    </div>
                ))}
            </dl>
        </div>
    )
}